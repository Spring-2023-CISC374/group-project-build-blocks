export default class MainMenuScene extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenuScene' });
	}

	preload(){
		this.load.image('background', 'assets/TempBackground.png');
        this.load.image('gridSquare', 'assets/GridSquare.png');
        this.load.image('regCrate', 'assets/RegCrate.png');
        this.load.image('craneOpen', 'assets/CraneBasicRed.png');
        this.load.image('craneClosed', 'assets/CraneBasicGreen.png');
        this.load.image('cranePickupBox', 'assets/CranePickupBox.png');
        this.load.spritesheet('visibilityButton', 'assets/VisibilityButtons.png', {frameWidth: 48, frameHeight: 32});
		
		this.load.image('instruction', 'assets/Instruction.png');
		this.load.image('instruction_linked', 'assets/Instruction_linked.png');
		
		this.load.image('instruction-loop', 'assets/LoopInstruction.png');
		this.load.image('instruction-loop_linked', 'assets/LoopInstruction_linked.png');

		this.load.image('instruction-number', 'assets/Instruction-number.png')
	}

	create() {
		// Create the title text
		const titleText = this.add.text((this.game.config.width as number) / 2, 100, 'Build Blocks', {
			fontSize: '64px',
		});
		titleText.setOrigin(0.5);

		// Create the Tutorial Level button
		const tutorialButton = this.add.rectangle((this.game.config.width as number) / 2, 300, 300, 50, 0x204060);
		tutorialButton.setInteractive();
		tutorialButton.on('pointerdown', () => {
			this.scene.start('TutorialLevelScene');
		});
		tutorialButton.on('pointerover', () => {
            tutorialButton.setFillStyle(0x204060, 0.6);
        });
        tutorialButton.on('pointerout', () => {
            tutorialButton.setFillStyle(0x204060, 1);
        });
		const tutorialButtonText = this.add.text((this.game.config.width as number) / 2, 300, 'Tutorial Level', {
			fontSize: '32px',
		});
		tutorialButtonText.setOrigin(0.5);

		// Create the Level Select button
		const levelSelectButton = this.add.rectangle((this.game.config.width as number) / 2, 400, 300, 50, 0x204060);
		levelSelectButton.setInteractive();
		levelSelectButton.on('pointerdown', () => {
			this.scene.start('LevelSelectScene');
		});
		levelSelectButton.on('pointerover', () => {
            levelSelectButton.setFillStyle(0x204060, 0.6);
        });
        levelSelectButton.on('pointerout', () => {
            levelSelectButton.setFillStyle(0x204060, 1);
        });
		const levelSelectButtonText = this.add.text((this.game.config.width as number) / 2, 400, 'Level Select', {
			fontSize: '32px',
		});
		levelSelectButtonText.setOrigin(0.5);
	}
}