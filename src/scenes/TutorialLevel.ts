import Instruction from '../objects/Instruction';
import { InstructionType } from '../types/InstructionType';
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

    declare protected start_instruction?: Instruction;
	protected loop_instruction?: Instruction;
	protected grab_instruction?: Instruction;
	protected release_instruction?: Instruction;
	protected endloop_instruction?: Instruction;
	protected up_instruction?: Instruction;
	protected down_instruction?: Instruction;
	protected right_instruction?: Instruction;
	protected left1_instruction?: Instruction;
	protected left2_instruction?: Instruction;
	protected number_instruction?: Instruction;

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

		this.makeInstructions();
	}

    update(){
        super.update();
    }

	makeInstructions() {
		let currX = 100;
        let currY = 50;
		
		const block_counts = [1, 1, 1, 2, 1, 1, 1, 1, 1];
        const block_types = ["start", "up", "down", "left", "right", "grab", "release", "loop", "endloop"];

        for(let i = 0; i < block_counts.length; i ++) {

            for(let j = 0; j < block_counts[i]; j++) {
                const fred = new Instruction(this, currX, currY, block_types[i] as InstructionType);
                this.Instructions?.add([fred,fred.instructionText]);
                currY += 50;
                if(currY >= 400) {
                    currX += 100;
                    currY = 50;
                }

				//nasty if block that sets the class variables I know it's bad code i just dont really have time to do it right
				if(block_types[i] === "start") {
					this.start_instruction = fred;
				}
				else if (block_types[i] === "up") {
					this.up_instruction = fred;
				}
				else if (block_types[i] === "down") {
					this.down_instruction = fred;
				}
				else if (block_types[i] === "right") {
					this.right_instruction = fred;
				}
				else if (block_types[i] === "left") {
					if(j === 0)
					this.left1_instruction = fred;
					else
					this.left2_instruction = fred;
				}
				else if (block_types[i] === "loop") {
					this.loop_instruction = fred;
				}
				else if (block_types[i] === "endloop") {
					this.endloop_instruction = fred;
				}
				else if (block_types[i] === "grab") {
					this.grab_instruction = fred;
				}
				else if (block_types[i] === "release") {
					this.release_instruction = fred;
				}
        }
		}
		const fred = new Instruction(this, currX, currY, "number", 2);
		this.Instructions?.add([fred,fred.instructionText]);
		this.number_instruction = fred;
	}
}
