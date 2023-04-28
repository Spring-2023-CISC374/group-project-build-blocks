import Phaser from 'phaser'
import Level from './scenes/Level'
import LevelSelectScene from './scenes/LevelSelectScene'

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
	scene: [LevelSelectScene, Level],
}

export default new Phaser.Game(config)
