import Phaser from 'phaser'

import MainMenu from './scenes/MainMenu'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: true
		},
	},
	scene: [MainMenu]
}

export default new Phaser.Game(config)