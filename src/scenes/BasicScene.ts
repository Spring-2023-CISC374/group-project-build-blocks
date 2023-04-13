import Phaser from 'phaser'
import Crane from '../objects/Crane';
import Crate from '../objects/Crate';
import { CharStream, CommonTokenStream } from 'antlr4';
import BlockLangLexer from '../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../ANTLR4/generated/BlockLangParser';
import BlockVisitor from '../scripts/utils/BlockVisitor';

export default class BasicScene extends Phaser.Scene {
    /* SCENE CONSTANTS */
    public static readonly BACKGROUND_WIDTH = 800;
    public static readonly BACKGROUND_HEIGHT = 600;
    public static readonly BACKGROUND_HORIZONTAL_CENTER = 400;
    public static readonly BACKGROUND_VERTICAL_CENTER = 300;

    public static readonly GRID_START_BOTTOM = 16;
    public static readonly GRID_START_LEFT = 16;
    public static readonly GRID_WIDTH = 10;
    public static readonly GRID_HEIGHT = 25;
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
		super('hello-world')
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
        this.background = this.add.image(BasicScene.BACKGROUND_HORIZONTAL_CENTER, BasicScene.BACKGROUND_VERTICAL_CENTER, 'background');
        this.background.setScale(BasicScene.BACKGROUND_WIDTH, BasicScene.BACKGROUND_HEIGHT);

        //create the grid for the building area and store it in gridSquares
        this.makeGrid(
            BasicScene.GRID_WIDTH, 
            BasicScene.GRID_HEIGHT, 
            BasicScene.GRID_START_LEFT, 
            BasicScene.GRID_START_BOTTOM, 
            BasicScene.GRID_SQUARE_SIZE
        );

        this.crates = this.physics.add.group({ collideWorldBounds: true });
        
        this.makeCrates();

        this.crane = new Crane(this, 16, this.sys.game.canvas.height - 16 - 32*5, false,);

        const cranColl = this.physics.add.collider(this.crane, this.crates);
        cranColl.active = false;

        this.time.delayedCall(5000, ()=>{cranColl.active = true});

        // TEMPORARY BUTTONS TO SHOW THAT CRANE MOVEMENT WORKS
        const leftButton = this.add.text(500, 100, 'Move Left!');
        leftButton.setInteractive();
        leftButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.moveLeft()}});

        const rightButton = this.add.text(500, 150, 'Move Right!');
        rightButton.setInteractive();
        rightButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.moveRight()}});

        const upButton = this.add.text(500, 200, 'Move Up!');
        upButton.setInteractive();
        upButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.moveUp()}});

        const downButton = this.add.text(500, 250, 'Move Down!');
        downButton.setInteractive();
        downButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.moveDown()}});

        const grabButton = this.add.text(500, 300, 'Grab!');
        grabButton.setInteractive();
        grabButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.grab()}});

        const releaseButton = this.add.text(500, 350, 'Release!');
        releaseButton.setInteractive();
        releaseButton.on('pointerup', () => {if(this.crane !== undefined) {this.crane.release()}});
        // create iframe and pass scene to it
        
        const iframe = document.getElementById('editor') as HTMLIFrameElement;
        console.log(iframe)
        const contentWnd = iframe.contentWindow as Window  & {scene: BasicScene};
        contentWnd.scene = this;

    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
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

    private makeGrid(numRows: number, numCols:number, startX: number, startY: number, squareSize: number) {

        for (let x = 0; x < numRows; x++) {
            
            const newRow = [];
            
            for (let y = 0; y < numCols; y++) {
                const newSquare = this.add.image(
                    startX + squareSize*x, 
                    (this.sys.game.canvas.height - startY) - squareSize*y, 
                    'gridSquare'
                );
                
                newRow.push(newSquare);
            }

            this.gridSquares?.push(newRow);
        }
    }

    private makeCrates() {
        this.crates = this.physics.add.group({ collideWorldBounds: true });
        const oneGuy = this.crates.create(16, 268, 'regCrate') as Crate;
        oneGuy.refreshBody()
        const twoGuy = this.crates.create(16, 300, 'regCrate') as Crate;
        twoGuy.refreshBody();
        
        //makes crates collide with themselves
        this.physics.add.collider(this.crates, this.crates)
    }

    // public getCrane() {
    //     return this.crane;
    // }

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