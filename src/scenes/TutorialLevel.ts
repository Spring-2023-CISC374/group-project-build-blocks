import { GridData } from './../interfaces/GridData';
import Level from './Level';

export default class TutorialLevel extends Level {

	tutLevelData: GridData = { width: 5, height: 5,
		gridObjects: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crane", "none", "none"],
			["none", "none", "none", "none", "none"],
			["crate-brown", "none", "none", "none", "none"]
		],
		gridObjectives: [
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "none", "none", "none"],
			["none", "none", "crate-brown", "none", "none"]
		],

		start_blocks: 0,
		loop_blocks: 0,
		endloop_blocks: 0,
		left_blocks: 0,
		right_blocks: 0,
		down_blocks: 0,
		up_blocks: 0,
		grab_blocks: 0,
		release_blocks: 0,
		number_blocks: [],
	};

	private static start_blocks = 1;
	private static loop_blocks= 1;
	private static endloop_blocks= 1;
	private static left_blocks= 2;
	private static right_blocks= 1;
	private static down_blocks= 1;
	private static up_blocks= 1;
	private static grab_blocks= 1;
	private static release_blocks= 1;
	private static number_blocks= [2];

	private tutorialTexts = [`Welcome to the tutorial level!
	Arrange the blocks by drag and drop, then click execute to control the crane.
	Use the close and open block to pick up and drop crates.
	Press the play button to start the level.
	Press the reset button to reset the level.
	Press the menu button to return to the level select screen.
	Press the help button to view this help message.
	
	Click here to continue.
	`, `The objective of the game is to move the crates to the objective tiles.*	
	Use the crane to move crate (opaque) to the objective tile (semi-transparent)
	 using the text (code) blocks.
	Now drag and drop the code blocks to the Start block and solve this level. :)

	Click here to dismiss this text.`


] // TODO: add more tutorial text?

    constructor(){
		super(`TutorialLevelScene`);
    }

    init() {
		super.init({levelNumber: -1, gridData: this.tutLevelData});
	}


	create(){
		// add dismissable text for tutorial
		const tutorial = this.add.text(400, 300, this.tutorialTexts.shift()!,
		{fontFamily: 'Arial', fontSize: "24px", color: '#FFFFFF', align: 'center', backgroundColor: "black"}).setOrigin(0.5, 0.5);
		tutorial.setInteractive();
		tutorial.on('pointerdown', () => {
			const tutorialText = this.tutorialTexts.shift();
			if(tutorialText){
				tutorial.setText(tutorialText);
			} else{
				tutorial.destroy();
			}
		});
	}

    update(){
        super.update();
    }
}
