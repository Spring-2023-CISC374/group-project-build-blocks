import Phaser from 'phaser'
import Level from './scenes/Level'
import LevelSelectScene from './scenes/LevelSelectScene'
import TutorialLevel from './scenes/TutorialLevel'
import MainMenuScene from './scenes/MainMenuScene'

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
	scene: [MainMenuScene,LevelSelectScene,TutorialLevel, Level],
}

export default new Phaser.Game(config)
