import Phaser from 'phaser'
import { GridData } from '../interfaces/GridData';

export default class LevelSelectScene extends Phaser.Scene {

	// private LevelBtns?: Array<Phaser.GameObjects>;

	/* SCENE CONSTANTS */
	private LEVELS: Array<GridData> = [
		//level 1 tested
		{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crane", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "crate-brown", "crate-brown", "none", "none"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crate-brown", "none", "none"],
			["none", "none", "crate-brown", "none", "none"],
			["none", "none", "crate-brown", "none", "none"]
		],

		start_blocks: 1,
		loop_blocks: 0,
		endloop_blocks: 0,
		left_blocks: 3,
		right_blocks: 3,
		down_blocks: 2,
		up_blocks: 3,
		grab_blocks: 2,
		release_blocks: 2,
		number_blocks: [],

	}, 	
	//level 2 tested
	{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "crane"],
			["crate-brown", "none", "crate-brown", "none", "none"],
			["crate-brown", "crate-brown", "crate-brown", "crate-brown", "none"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "none", "none", "none", "none"],
			["crate-brown", "crate-brown", "none", "none", "none"],
			["crate-brown", "crate-brown", "crate-brown", "none", "none"]
		],

		start_blocks: 1,
		loop_blocks: 0,
		endloop_blocks: 0,
		left_blocks: 5,
		right_blocks: 1,
		down_blocks: 2,
		up_blocks: 3,
		grab_blocks: 2,
		release_blocks: 2,
		number_blocks: [],

	}, 
	//level 3 tested
	{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crane", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "none", "none", "none", "crate-brown"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "crate-brown"],
			["none", "none", "none", "none", "crate-brown"]
		],

		start_blocks: 1,
		loop_blocks: 1,
		endloop_blocks: 1,
		left_blocks: 0,
		right_blocks: 1,
		down_blocks: 1,
		up_blocks: 1,
		grab_blocks: 1,
		release_blocks: 1,
		number_blocks: [4],

	}, 	
	//level 4 tested
	{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "crane"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "none", "none", "none", "crate-brown"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "crate-brown"],
			["none", "none", "none", "none", "crate-brown"]
		],

		start_blocks: 1,
		loop_blocks: 2,
		endloop_blocks: 2,
		left_blocks: 1,
		right_blocks: 1,
		down_blocks: 1,
		up_blocks: 1,
		grab_blocks: 1,
		release_blocks: 1,
		number_blocks: [4, 4],

	}, 
	//level 5 tested
	{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crane", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-red", "crate-green", "crate-blue", "none", "none"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crate-green", "none", "none"],
			["none", "none", "crate-red", "none", "none"],
			["none", "none", "crate-blue", "none", "none"]
		],

		start_blocks: 1,
		loop_blocks: 0,
		endloop_blocks: 0,
		left_blocks: 3,
		right_blocks: 3,
		down_blocks: 2,
		up_blocks: 3,
		grab_blocks: 2,
		release_blocks: 2,
		number_blocks: [],

	}, 
	// level 6 not tested
	{ width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["crane", "none", "none", "none", "none"],
			["none", "none", "crate-red", "none", "none"],
			["crate-green", "none", "crate-red", "none", "crate-blue"],
			["crate-blue", "none", "crate-red", "none", "crate-green"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crate-red", "none", "none"],
			["none", "none", "crate-red", "none", "none"],
			["crate-blue", "crate-blue", "crate-red", "crate-green", "crate-green"]
		],
		start_blocks: 1,
		loop_blocks: 3,
		endloop_blocks: 3,
		left_blocks: 1,
		right_blocks: 2,
		down_blocks: 2,
		up_blocks: 2,
		grab_blocks: 2,
		release_blocks: 2,
		number_blocks: [3, 3, 3],
	}]

	constructor() {
		super({ key: 'LevelSelectScene' });
	}

	create() {
		for (let i = 0; i < this.LEVELS.length; i++) {
		// for (let i = 0; i < 20; i++) {
			const levelButton = this.add.rectangle(100 + (i % 6) * 100, 100 + Math.floor(i / 6) * 100, 80, 80, 0x204060, 1);
			levelButton.setInteractive();
			levelButton.on('pointerover', () => {
				levelButton.setFillStyle(0x204060, 0.6);
			});
			levelButton.on('pointerout', () => {
				levelButton.setFillStyle(0x204060, 1);
			});
			const levelText = this.add.text(100 + (i % 6) * 100, 100 + (Math.floor(i / 6)) * 100, `${i + 1}`, {
				fontSize: '40px',
				color: '#fff',
			});

			levelText.setOrigin(0.5);

			levelButton.on('pointerdown', () => {
				console.log(`level ${i} clicked`);
				
				this.scene.start(`LevelScene`,{levelNumber: i, gridData: this.LEVELS[i], 
					// blockCount: {"left": 999, "right": 999, "up": 999, "down": 999,
					//  "close": 999, "open": 999, "loops": 999, "numbers": 999}
				});
			});
		}
	}


}