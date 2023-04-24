import Phaser from 'phaser'
import { GridData } from '../interfaces/GridData';
import { LevelDataT } from '../interfaces/LevelDataT';
import Level from '../scenes/Level'

export default class LevelSelectScene extends Phaser.Scene {

	// private LevelBtns?: Array<Phaser.GameObjects>;

	/* SCENE CONSTANTS */
	private LEVELS: Array<GridData> = [{ width: 5, height: 5, 
		gridObjects: [
			["none", "none", "none", "none", "crane"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "crate-brown", "crate-brown", "none", "none"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crate-brown", "none", "none"],
			["none", "none", "crate-brown", "none", "none"],
			["none", "none", "crate-brown", "none", "none"]
		]
	}, { width: 5, height: 5, 
		gridObjects: [
			["none", "none", "none", "none", "crane"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "crate-red"],
			["crate-green", "crate-red", "crate-blue", "none", "crate-blue"],
			["crate-red", "crate-blue", "crate-green", "none", "crate-green"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-blue", "crate-red", "crate-green", "none", "none"],
			["crate-blue", "crate-red", "crate-green", "none", "none"],
			["crate-blue", "crate-red", "crate-green", "none", "none"]
		]
	}]

	constructor() {
		super({ key: 'LevelSelectScene' });
	}

	// init() {
	// }

	// preload(){
    //     // this.load.image('background', '../assets/TempBackground.png');
    //     // this.load.image('gridSquare', '../assets/GridSquare.png');

    //     // this.load.image('regCrate', '../assets/RegCrate.png');
    //     // this.load.image('craneOpen', '../assets/CraneBasicRed.png');
    //     // this.load.image('craneClosed', '../assets/CraneBasicGreen.png');
    //     // this.load.image('cranePickupBox', '../assets/CranePickupBox.png');
	// }

	create() {
		// for (let i = 0; i < this.LEVELS.length; i++) {
		for (let i = 0; i < 20; i++) {
			const levelButton = this.add.rectangle(100 + (i % 6) * 100, 100 + Math.floor(i / 6) * 100, 80, 80, 0x204060, 1);
			levelButton.setInteractive();
			levelButton.on('pointerover', () => {
				levelButton.setFillStyle(0x204060, 0.6);
			});
			levelButton.on('pointerout', () => {
				levelButton.setFillStyle(0x204060, 1);
			});
			const levelText = this.add.text(100 + (i % 6) * 100, 100 + (Math.floor(i / 6)) * 100, `${i}`, {
				fontSize: '40px',
				color: '#fff',
			});

			levelText.setOrigin(0.5);

			levelButton.on('pointerdown', () => {
				console.log(`level ${i} clicked`);
				
				this.scene.start(`level`,{levelNumber: i, gridData: this.LEVELS[i], maxScore: 0});
			});
		}
	}


}