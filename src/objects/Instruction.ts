//stolen from prof Wassil's refactor homework

import { InstructionType } from "../types/InstructionType";

export default class Instruction extends Phaser.GameObjects.Image {

    /* CLASS VARIABLE */
    public instructionType: InstructionType;
    public instructionText;

    public loopChild?: Instruction;
    public loopNumber?: number;

    public nextInstruction?: Instruction;
    public previousInstruction?: Instruction;

    constructor(scene: Phaser.Scene, x: number, y: number, instructionType: InstructionType, number?: number) {
        
        super(scene, x, y, "instruction");

        this.instructionText = scene.add.text(x - 88/2, y - 24/2, instructionType, {color: "black", fontSize: "20px", align: "left"});
        this.instructionText.depth = 999;
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
    handleDrag(_mouse: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) {

        // brings the object being dragged to the bottom because dropping only works when its behind everything for some reason
        if(this !== gameObject) {
            this.scene.children.bringToTop(this);
        }

        // removes parent relationship from the linked list segment when dragged
        if(this === gameObject){
            if(this.previousInstruction){
                this.previousInstruction.nextInstruction = undefined;
                this.previousInstruction = undefined;
            }

            this.moveInstruction(dragX, dragY);
        }
        this.instructionText.depth = 999;
    }    
    
    moveInstruction(dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;
        this.instructionText.x = dragX - 88/2;
        this.instructionText.y = dragY - 24/2;
        
        //if there is a child update it (NEEDS TO BE OFFSET STILL)
        if(this.nextInstruction !== undefined) {
            this.nextInstruction.moveInstruction(dragX, dragY + 31);
        }
    }

    snapIntoPlace(){
        if(this.previousInstruction){
            this.x = this.previousInstruction.x;
            this.y = this.previousInstruction.y + 31;
        }
        if(this.nextInstruction){
            this.nextInstruction?.snapIntoPlace();
        }
    }

    handleDrop(_mouse: Phaser.Input.Pointer, dragTarget: Phaser.GameObjects.GameObject, dropTarget: Phaser.GameObjects.GameObject) {
        if(dragTarget === this) {
            if(dropTarget instanceof Instruction && dropTarget !== this){

                //inserts this instruction into the linked list
                if(this.previousInstruction === undefined && dropTarget.nextInstruction === undefined) {
                    this.previousInstruction = dropTarget;
                    this.previousInstruction.nextInstruction = this;
                }

                //snaps added instruction into place
                this.snapIntoPlace();
            }
        }

    }

}