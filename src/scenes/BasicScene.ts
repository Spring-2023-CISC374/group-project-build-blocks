import Phaser from 'phaser'

export default class BasicScene extends Phaser.Scene {
    /* SCENE CONSTANTS */
    public static readonly BACKGROUND_WIDTH = 800;
    public static readonly BACKGROUND_HEIGHT = 600;
    public static readonly BACKGROUND_HORIZONTAL_CENTER = 400;
    public static readonly BACKGROUND_VERTICAL_CENTER = 300;

    public static readonly GRID_START_BOTTOM = 0;
    public static readonly GRID_START_LEFT = 0;
    public static readonly GRID_WIDTH = 5;
    public static readonly GRID_HEIGHT = 5;


    /* SCENE VARIABLES */
    private background?: Phaser.GameObjects.Image
    private gridSquares?: Phaser.GameObjects.Image[];

    /* ESSENTIAL FUNCTIONS */
    constructor() {
        //don't know what this does; it comes from the starter project
		super('hello-world')
	}
    
    preload() {
        this.load.image('background', '../public/assets/TempBackground.png');
        this.load.image('gridSquare', '../public/assets/GridSquare.png');
	}

    create() {

        //create the background and set the scale
        this.background = this.add.image(BasicScene.BACKGROUND_HORIZONTAL_CENTER, BasicScene.BACKGROUND_VERTICAL_CENTER, 'background');
        this.background.setScale(BasicScene.BACKGROUND_WIDTH, BasicScene.BACKGROUND_HEIGHT);

        const fred = this.add.image(400, 300, 'gridSquare');

        this.gridSquares?.push(fred);
    }

    update(){

    }

    /* HELPER FUNCTIONS */
}