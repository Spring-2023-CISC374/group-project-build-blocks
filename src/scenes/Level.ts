import Phaser from 'phaser'
import Crane from '../objects/Crane';
import { GridData } from '../interfaces/GridData';
import { CharStream, CommonTokenStream } from 'antlr4';
import BlockLangLexer from '../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../ANTLR4/generated/BlockLangParser';
import BlockVisitor from '../scripts/utils/BlockVisitor';
import Crate from '../objects/Crate';

export default class Level extends Phaser.Scene {
    
    /* SCENE CONSTANTS */
    private readonly MAX_SCORE: number;

    private gridData: GridData;

    public static readonly GRID_START_BOTTOM = 16;
    public static readonly GRID_START_LEFT = 16;
    public static readonly GRID_SQUARE_SIZE = 32;


    /* SCENE VARIABLES */

    private crates?: Phaser.Physics.Arcade.Group
    private endCrates?: Phaser.Physics.Arcade.Group
    private crane?: Crane;
    private score = 0;

    //the background of the scene
    private background?: Phaser.GameObjects.Image
    
    //the 2D grid of the building area [x][y] with 0,0 being bottom left
    private gridSquares?: Phaser.GameObjects.Image[][];

    /* ESSENTIAL FUNCTIONS */
    constructor(levelNumber: number, gridData: GridData, maxScore: number) {
		super(`Level ${levelNumber}`);
        this.gridData = gridData;
        this.MAX_SCORE = maxScore;
	}

    preload() {
        this.load.image('background', '../assets/TempBackground.png');
        this.load.image('gridSquare', '../assets/GridSquare.png');

        this.load.image('regCrate', '../assets/regCrate.png');
        this.load.image('craneOpen', '../assets/CraneBasicRed.png');
        this.load.image('craneClosed', '../assets/CraneBasicGreen.png');
        this.load.image('cranePickupBox', '../assets/CranePickupBox.png')
	}

    

    protected createLevel() {

        //create the background and set the scale
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background.setScale(this.sys.game.canvas.width, this.sys.game.canvas.height);

        //create the grid for the building area and store it in gridSquares
        this.makeGrid();

        // create iframe and pass scene to it
        const iframe = document.getElementById('editor') as HTMLIFrameElement;
        console.log(iframe)
        const contentWnd = iframe.contentWindow as Window  & {scene: Level};
        contentWnd.scene = this;


        //TEMP TEXT
        // this.add.text(550, 0, this.blockCount, {color: "black"});
        // this.add.text(350, 0, this.goal, {color: "black"});
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
        this.checkWin();
    }

    /* HELPER FUNCTIONS */

    private makeGrid() {

        // makes the grid overlay
        for (let x = 0; x < this.gridData.width; x++) {
            
            const newRow = [];
            
            for (let y = 0; y < this.gridData.height; y++) {
                const newSquare = this.add.image(
                    Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x, 
                    (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y, 
                    'gridSquare'
                );
                
                newRow.push(newSquare);
            }

            this.gridSquares?.push(newRow);
        }

        // makes the game objects
        this.crates = this.placeBlocks(true);
        this.endCrates = this.placeBlocks(false);
        this.endCrates.setAlpha(0.5);
    }

    private placeBlocks(isBlocks: boolean) {
        const crates = this.physics.add.group({ collideWorldBounds: true });
        for (let x = 0; x < this.gridData.width; x++) {
            for (let y = this.gridData.height - 1; y >= 0; y--) {
                console.log("test");
                switch(isBlocks ? this.gridData.gridObjects[4-y][x] : this.gridData.gridObjectives[4-y][x]) {
                    case "none":
                        break;
                    case "crane":{
                        this.crane = new Crane(
                            this, 
                            Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x, 
                            (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y,  
                            false
                        );
                        break;
                    }
                    case "crate-brown": {
                        const oneGuy = new Crate(
                            this, 
                            Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x,
                            (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "none"
                        );
                        if (!isBlocks) {
                            oneGuy.setAlpha(0.5);
                        }
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    }    
                    case "crate-red": {
                        const oneGuy = new Crate(
                            this, 
                            Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x,
                            (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "red"
                        );
                        
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    } 
                    case "crate-green": {
                        const oneGuy = new Crate(
                            this, 
                            Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x,
                            (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "green"
                        );
                        
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    } 
                    case "crate-blue":  {
                        const oneGuy = new Crate(
                            this, 
                            Level.GRID_START_LEFT + Level.GRID_SQUARE_SIZE*x,
                            (this.sys.game.canvas.height - Level.GRID_START_BOTTOM) - Level.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "blue"
                        );
                        
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    } 
                    default: {
                        break;
                    }
                }
            }
        }
        this.physics.add.collider(crates, crates)
        if(this.crane !== undefined && isBlocks) {
            this.physics.add.collider(this.crane, crates);
        }
        return crates;
    }

    private checkOverlap(c: Crate, ec:Crate) {
        if (c.getColor() !== ec.getColor()) {
            return false;
        }
        const xdiff = Math.abs( ec.body.position.x - c.body.position.x );
        const ydiff = Math.abs( ec.body.position.y - c.body.position.y );
        const diff = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        return diff < 6;
    }

    private getScore() {
        this.score = 0;
        this.crates?.getChildren().forEach((c) => {
            this.endCrates?.getChildren().forEach((ec) => {
                const crate = c as Crate
                const ecrate = ec as Crate
                if (this.checkOverlap(ecrate, crate)) {
                    this.score++;
                }
            })
        }, this)
    }

    private checkWin() {
        this.getScore();
        const didWin = this.score === this.MAX_SCORE;
        if (didWin) {
            this.add.text(400,300,"YOU WIN!");
        }
        return didWin;
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