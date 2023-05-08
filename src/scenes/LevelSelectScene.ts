import Phaser from 'phaser'
import { GridData } from '../interfaces/GridData';

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
		],

		start_blocks: 1,
		loop_blocks: 2,
		endloop_blocks: 2,
		left_blocks: 6,
		right_blocks: 6,
		down_blocks: 6,
		up_blocks: 6,
		grab_blocks: 3,
		release_blocks: 3,
		number_blocks: [1, 2, 3, 4],

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
		],
		start_blocks: 1,
		loop_blocks: 2,
		endloop_blocks: 2,
		left_blocks: 6,
		right_blocks: 6,
		down_blocks: 6,
		up_blocks: 6,
		grab_blocks: 3,
		release_blocks: 3,
		number_blocks: [1, 2, 3, 4],
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
			const levelText = this.add.text(100 + (i % 6) * 100, 100 + (Math.floor(i / 6)) * 100, `${i}`, {
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