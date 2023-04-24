import { GridData } from './../interfaces/GridData';
import Phaser from "phaser";

export default class Grid extends Phaser.Physics.Arcade.Group {
    //the 2D grid of the building area [x][y] with 0,0 being bottom left
    private gridSquares?: Phaser.GameObjects.Image[][];
    private gridData?: GridData;

    constructor (GridData: GridData, world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(world, scene)
        this.gridData = GridData;
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
        this.endCrates = this.placeBlocks(false);
        this.endCrates.setAlpha(0.5);
        this.crates = this.placeBlocks(true);
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
}