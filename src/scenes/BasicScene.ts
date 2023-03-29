import Phaser from 'phaser'
import Crate from '../objects/Crate';

export default class BasicScene extends Phaser.Scene {
    /* SCENE CONSTANTS */
    public static readonly BACKGROUND_WIDTH = 800;
    public static readonly BACKGROUND_HEIGHT = 600;
    public static readonly BACKGROUND_HORIZONTAL_CENTER = 400;
    public static readonly BACKGROUND_VERTICAL_CENTER = 300;

    public static readonly GRID_START_BOTTOM = 16;
    public static readonly GRID_START_LEFT = 16;
    public static readonly GRID_WIDTH = 10;
    public static readonly GRID_HEIGHT = 10;
    public static readonly GRID_SQUARE_SIZE = 32;


    /* SCENE VARIABLES */

    private crates?: Phaser.Physics.Arcade.Group

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
        this.load.image('regCrate', '../public/assets/regCrate.png')
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
        
        this.makeCrates();

    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    update(){

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
}