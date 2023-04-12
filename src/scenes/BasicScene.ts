import Phaser from 'phaser'
import Crane from '../objects/Crane';
import { GridData } from '../interfaces/GridData';

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
}