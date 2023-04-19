//stolen from prof Wassil's refactor homework

import { InstructionType } from "../types/InstructionType";

export default class Instruction extends Phaser.GameObjects.Image {

    /* CLASS VARIABLE */

    private instructionType: InstructionType;
    
    private loopNum = 0;

    public nextInstruction?: Instruction;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, instructionType: InstructionType) {
        super(scene, x, y, texture);
        this.instructionType = instructionType;      

        //enable drag
        this.setInteractive();
        scene.input.setDraggable(this);

        //adds tint effect when hovered over
        this.on('pointerover', () => {
            this.setTint(0x44ff44);
        });

        //removes tint effect when no longer hovered over
        this.on('pointerout', () => {
            this.clearTint();
        });

        // input.on  drag event  Pointer triggering event, gameObject, x & y stolen from wassil's phaser-scenes repo
        scene.input.on('drag', this.handleDrag, this);
        //this.input.enabled = true;
        //this.input.draggable = true;

    }
    
    
    
    // when this is called from other scenes it will pass these values    
    handleDrag(mouse: Phaser.Input.Pointer, gameObject: Instruction, dragX: number, dragY: number) {
        if(this === gameObject){
            console.log("handleDrag " + this.x + " " + this.y);
            this.x = dragX;
            this.y = dragY;
        }

        //if there is a child update it (NEEDS TO BE OFFSET STILL)
        if(this.nextInstruction !== undefined) {
            console.log("moving childs");
            this.nextInstruction.handleDrag(mouse, this.nextInstruction, dragX, dragY + 32);
        }
    }    
   
}