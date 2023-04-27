import { GridData } from './../interfaces/GridData';
import Phaser from "phaser";
import Crane from './Crane';
import Crate from './Crate';
import Level from '../scenes/Level';
import { GridVars, fillGridVars } from '../interfaces/GridVars';
import { LevelObject } from '../types/LevelObject';

export default class Grid {

    private scene: Phaser.Scene;

    // Grid Variables
    private gridData: GridData;
    private isPrimaryGrid: boolean;
    
    private gridSquares?: Phaser.GameObjects.Image[][];
    public crane?: Crane;
    public crates?: Phaser.Physics.Arcade.Group
    public endCrates?: Phaser.Physics.Arcade.Group
    private toggleVisibleButton?: Phaser.GameObjects.Sprite;

    public gridVars: GridVars
    private isVisible: boolean;

    /**
     * A grid object
     * @param GridData - GridData
     * @param isPrimaryGrid - boolean: is grid with movable blocks or the solution template
     * @param world - Phaser.Physics.Arcade.World
     * @param scene - Phaser.Scene
     */
    constructor (GridData: GridData, isPrimaryGrid: boolean, scene: Phaser.Scene) {
        this.scene = scene;
        this.isPrimaryGrid = isPrimaryGrid;
        this.gridData = GridData;
        if (this.isPrimaryGrid) {
            this.gridVars = fillGridVars(
                Level.P_GRID_START_BOTTOM, 
                Level.P_GRID_START_LEFT, 
                Level.P_GRID_SQUARE_SIZE, 
                GridData
            );
        } else {
            this.gridVars = fillGridVars(
                Level.S_GRID_START_BOTTOM, 
                Level.S_GRID_START_LEFT, 
                Level.S_GRID_SQUARE_SIZE, 
                GridData
            );
        }
        this.isVisible = true;
    }
    /* HELPER FUNCTIONS */

    getGoalText(): string {
		let result = "GOAL\n";
  		const legend = "\nE = empty\nC = crane\nT = tan\nR = Red\nG = green\nB = blue";
  
		const symbolMap = {
			"none": "E",
			"crate-brown": "T",
			"crate-red": "R",
			"crate-green": "G",
			"crate-blue": "B",
			"crane": "C"
		  };

		  for (let i = 0; i < this.gridData.gridObjectives.length; i++) {
			for (let j = 0; j < this.gridData.gridObjectives[i].length; j++) {
			  const symbol = symbolMap[this.gridData.gridObjectives[i][j]] || "?";
			  result += symbol + " ";
			}
			result += "\n";
		  }
		  
		  result += legend;

		  return result;
	}

    public makeGrid() {

        // makes the grid overlay
        for (let x = 0; x < this.gridData.width; x++) {
            
            const newRow = [];
            
            for (let y = 0; y < this.gridData.height; y++) {
                const newSquare = this.scene.add.image(
                    this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x, 
                    (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y, 
                    'gridSquare'
                );
                
                newRow.push(newSquare);
            }

            this.gridSquares?.push(newRow);
        }

        // makes the game objects
        this.endCrates = this.placeBlocks(false);
        this.endCrates.setAlpha(0.5);
        if (this.isPrimaryGrid) {
            this.crates = this.placeBlocks(true);
            
            this.toggleVisibleButton = this.scene.add.sprite(
                this.gridVars.GRID_MID_HORIZONTAL,
                this.scene.sys.game.canvas.height - (this.gridVars.GRID_END_TOP + 20),
                'visibilityButton'
            ).setFrame(1);
            this.toggleVisibleButton.setInteractive();
            this.toggleVisibleButton.on('pointerup', () => {
                console.log('clicked');
                this.isVisible = !this.isVisible;
                this.crates?.setVisible(this.isVisible);
                this.toggleVisibleButton?.setFrame(this.isVisible ? 1 : 0);
            });
            this.toggleVisibleButton.setOrigin(0.8);
        }
    }

    private placeBlocks(isBlocks: boolean) {
        const crates = this.scene.physics.add.group({ collideWorldBounds: true });
        for (let x = 0; x < this.gridData.width; x++) {
            for (let y = this.gridData.height - 1; y >= 0; y--) {
                console.log("test");
                switch(isBlocks ? this.gridData.gridObjects[4-y][x] : this.gridData.gridObjectives[4-y][x]) {
                    case "none":
                        break;
                    case "crane":{
                        this.crane = new Crane(
                            this.scene, 
                            this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x, 
                            (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y,  
                            false
                        );
                        break;
                    }
                    case "crate-brown": {
                        const oneGuy = new Crate(
                            this.scene, 
                            this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x,
                            (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "brown"
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
                            this.scene, 
                            this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x,
                            (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "red"
                        );
                        
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    } 
                    case "crate-green": {
                        const oneGuy = new Crate(
                            this.scene, 
                            this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x,
                            (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y,
                            "regCrate",
                            "green"
                        );
                        
                        oneGuy.refreshBody();
                        crates.add(oneGuy);
                        break;
                    } 
                    case "crate-blue":  {
                        const oneGuy = new Crate(
                            this.scene, 
                            this.gridVars.GRID_START_LEFT + this.gridVars.GRID_SQUARE_SIZE*x,
                            (this.scene.sys.game.canvas.height - this.gridVars.GRID_START_BOTTOM) - this.gridVars.GRID_SQUARE_SIZE*y,
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
        this.scene.physics.add.collider(crates, crates)
        if(this.crane !== undefined && isBlocks) {
            this.scene.physics.add.collider(this.crane, crates);
        }
        return crates;
    }
}