//stolen from prof Wassil's refactor homework

import { InstructionType } from "../types/InstructionType";

export default class Instruction extends Phaser.GameObjects.Image {

    /* CLASS VARIABLE */
    public instructionType: InstructionType;
    
    //private loopNum = 0;

    public nextInstruction?: Instruction;
    public previousInstruction?: Instruction;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, instructionType: InstructionType) {
        super(scene, x, y, texture);
        this.instructionType = instructionType;      

        //enable drag
        this.setInteractive();
        scene.input.setDraggable(this);
        this.input.dropZone = true;

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
        scene.input.on('drop', this.handleDrop, this);
    }
    
    
    
    // when this is called from other scenes it will pass these values    
    handleDrag(mouse: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) {

        // brings the object being dragged to the bottom because dropping only works when its behind everything for some reason
        if(this !== gameObject) {
            this.scene.children.bringToTop(this);
        }

        if(this === gameObject){
            if(this.previousInstruction){
                this.previousInstruction.nextInstruction = undefined;
                this.previousInstruction = undefined;
            }

            this.moveInstruction(dragX, dragY);
        }
    }    
    
    moveInstruction(dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;
        
        //if there is a child update it (NEEDS TO BE OFFSET STILL)
        if(this.nextInstruction !== undefined) {
            this.nextInstruction.moveInstruction(dragX, dragY + 31);
        }
    }

    handleDrop(mouse: Phaser.Input.Pointer, dragTarget: Phaser.GameObjects.GameObject, dropTarget: Phaser.GameObjects.GameObject) {
        if(dragTarget === this) {
            if(dropTarget instanceof Instruction && dropTarget !== this){

                //inserts this instruction into the linked list
                this.previousInstruction = dropTarget;
                this.previousInstruction.nextInstruction = this;

                //snaps added instruction into place
                this.x = this.previousInstruction.x;
                this.y = this.previousInstruction.y + 31;
            }
        }

    }

}