import Phaser from 'phaser'
import Crane from './Crane';
import { GridData } from '../interfaces/GridData';
import { CharStream, CommonTokenStream } from 'antlr4';
import BlockLangLexer from '../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../ANTLR4/generated/BlockLangParser';
import BlockVisitor from '../scripts/utils/BlockVisitor';
import Crate from './Crate';
import Grid from './Grid';

export default class Level extends Phaser.Scene {
    
    /* SCENE CONSTANTS */
    private readonly MAX_SCORE: number;

    private grid: Grid;
    private secondaryGrid: Grid;

    public static readonly P_GRID_START_BOTTOM = 16;
    public static readonly P_GRID_START_LEFT = 16;
    public static readonly P_GRID_SQUARE_SIZE = 32;    

    
    public static readonly S_GRID_START_BOTTOM = 16;
    public static readonly S_GRID_START_LEFT = 300;
    public static readonly S_GRID_SQUARE_SIZE = 32;


    /* SCENE VARIABLES */

    private crates?: Phaser.Physics.Arcade.Group
    private endCrates?: Phaser.Physics.Arcade.Group
    private crane?: Crane;
    private toggleVisibleButton?: Phaser.GameObjects.Text;
    private score = 0;

    //the background of the scene
    private background?: Phaser.GameObjects.Image


    /* ESSENTIAL FUNCTIONS */
    constructor(levelNumber: number, gridData: GridData, maxScore: number) {
		super(`Level ${levelNumber}`);
        this.grid = new Grid(gridData, true, this);
        this.secondaryGrid = new Grid(gridData, false, this);
        this.MAX_SCORE = maxScore;
	}

    preload() {
        this.load.image('background', '../assets/TempBackground.png');
        this.load.image('gridSquare', '../assets/GridSquare.png');

        this.load.image('regCrate', '../assets/regCrate.png');
        this.load.image('craneOpen', '../assets/CraneBasicRed.png');
        this.load.image('craneClosed', '../assets/CraneBasicGreen.png');
        this.load.image('cranePickupBox', '../assets/CranePickupBox.png');
        this.load.spritesheet('visibilityButton', '../assets/VisibilityButtons.png', {frameWidth: 48, frameHeight: 32});
	}

    protected createLevel() {

        //create the background and set the scale
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background.setScale(this.sys.game.canvas.width, this.sys.game.canvas.height);

        // Create Grid and pass handlers
        this.grid.makeGrid();
        this.crates = this.grid.crates;
        this.endCrates = this.grid.endCrates;
        this.crane = this.grid.crane;

        this.secondaryGrid.makeGrid();

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