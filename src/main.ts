import Phaser from 'phaser'

import BasicScene from './scenes/BasicScene'
import Level2 from './scenes/Level2'
import Level from './scenes/Level'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
	scene: [Level2],
}

export default new Phaser.Game(config)
