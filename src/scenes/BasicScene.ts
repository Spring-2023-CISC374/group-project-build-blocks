import Phaser from 'phaser'
import Crane from '../objects/Crane';
import { GridData } from '../interfaces/GridData';
import { CharStream, CommonTokenStream } from 'antlr4';
import BlockLangLexer from '../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../ANTLR4/generated/BlockLangParser';
import BlockVisitor from '../scripts/utils/BlockVisitor';

export default class BasicScene extends Phaser.Scene {
    
    /* SCENE CONSTANTS */
    private startGridData: GridData = { width: 5, height: 5, gridObjects: 
        [
            ["crate-brown", "none", "none", "none", "none"],
            ["crate-brown", "crate-brown", "none", "none", "none"],
            ["none", "none", "none", "none", "none"],
            ["none", "none", "none", "crane", "none"],
            ["none", "none", "crate-brown", "none", "none"]
        ]
    }

    public static readonly GRID_START_BOTTOM = 16;
    public static readonly GRID_START_LEFT = 16;
    public static readonly GRID_SQUARE_SIZE = 32;


    /* SCENE VARIABLES */

    private crates?: Phaser.Physics.Arcade.Group
    private crane?: Crane;

    //the background of the scene
    private background?: Phaser.GameObjects.Image
    
    //the 2D grid of the building area [x][y] with 0,0 being bottom left
    private gridSquares?: Phaser.GameObjects.Image[][];

    /* ESSENTIAL FUNCTIONS */
    constructor() {
        //don't know what this does; it comes from the starter project
		super('hello-world');
	}
    
    preload() {
        this.load.image('background', '../public/assets/TempBackground.png');
        this.load.image('gridSquare', '../public/assets/GridSquare.png');

        this.load.image('regCrate', '../public/assets/regCrate.png');
        this.load.image('craneOpen', '../public/assets/CraneBasicRed.png');
        this.load.image('craneClosed', '../public/assets/CraneBasicGreen.png');
        this.load.image('cranePickupBox', '../public/assets/CranePickupBox.png')
	}

    create() {

        //create the background and set the scale
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background.setScale(this.sys.game.canvas.width, this.sys.game.canvas.height);

        //create the grid for the building area and store it in gridSquares
        this.makeGrid();

        // create iframe and pass scene to it
        const iframe = document.getElementById('editor') as HTMLIFrameElement;
        console.log(iframe)
        const contentWnd = iframe.contentWindow as Window  & {scene: BasicScene};
        contentWnd.scene = this;

    }

    update(){
        if(this.crane !== undefined) {
            if(!this.physics.overlap(this.crane.PICKUP_BOX, this.crates, (_box, crate) => {
                    if(this.crane !== undefined) {
                        this.crane.toGrab = crate as Phaser.Physics.Arcade.Sprite;
                    }
                }
                )
            ) {
                this.crane.toGrab = undefined;
            }
        }
    }

    /* HELPER FUNCTIONS */

    private makeGrid() {

        // makes the grid overlay
        for (let x = 0; x < this.startGridData.width; x++) {
            
            const newRow = [];
            
            for (let y = 0; y < this.startGridData.height; y++) {
                const newSquare = this.add.image(
                    BasicScene.GRID_START_LEFT + BasicScene.GRID_SQUARE_SIZE*x, 
                    (this.sys.game.canvas.height - BasicScene.GRID_START_BOTTOM) - BasicScene.GRID_SQUARE_SIZE*y, 
                    'gridSquare'
                );
                
                newRow.push(newSquare);
            }

            this.gridSquares?.push(newRow);
        }

        // makes the game objects
        this.crates = this.physics.add.group({ collideWorldBounds: true });
        for (let x = 0; x < this.startGridData.width; x++) {
            for (let y = 0; y < this.startGridData.height; y++) {
                console.log("test");
                switch(this.startGridData.gridObjects[y][x]) {
                    case "none":
                        break;
                    case "crane":{
                        this.crane = new Crane(
                            this, 
                            BasicScene.GRID_START_LEFT + BasicScene.GRID_SQUARE_SIZE*x, 
                            (this.sys.game.canvas.height - BasicScene.GRID_START_BOTTOM) - BasicScene.GRID_SQUARE_SIZE*y,  
                            false
                        );
                        break;
                    }
                    case "crate-brown": {
                        const oneGuy = this.crates.create(
                            BasicScene.GRID_START_LEFT + BasicScene.GRID_SQUARE_SIZE*x, 
                            (this.sys.game.canvas.height - BasicScene.GRID_START_BOTTOM) - BasicScene.GRID_SQUARE_SIZE*y, 
                            'regCrate'
                        );
                        
                        oneGuy.refreshBody();
                        break;
                    }    
                    case "crate-red":  
                        break;
                    case "crate-green":  
                        break;
                    case "crate-blue":  
                        break;
                    default:
                        break;
                  }
            }
        }
        this.physics.add.collider(this.crates, this.crates)
        if(this.crane !== undefined) {
            this.physics.add.collider(this.crane, this.crates);
        }
    }

    testCode(s: string) {
        const input = s;
        const chars = new CharStream(input);
        const lexer = new BlockLangLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new BlockLangParser(tokens);
        let error = "";
        lexer.removeErrorListeners();
        lexer.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, e) => {
                error += `Error: ${msg} at line ${line} and column ${column}. <br>`;
            }
        });
        parser.buildParseTrees = true;
        parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, e) => {
                error += `Error: ${msg} at line ${line} and column ${column}. <br>`;
            }
        });
        const tree = parser.program();
        const visitor = new BlockVisitor(null, this);
        console.log(visitor.visit(tree));
        // console.log(formatParseTree(tree.toStringTree(null, parser)));
    }
}