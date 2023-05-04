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
        
        //number instructions have an additional field and a different sprite
        if(instructionType === "number" && number) {
            super(scene, x, y, "instruction-number");
            this.loopNumber = number;
            this.instructionText = scene.add.text(x - 6, y - 9, number.toString(), {color: "black", fontSize: "18px", align: "left"});
            this.instructionText.depth = 999;
        }
        //loop instructions have a different sprite
        else if(instructionType === "loop") {
            super(scene, x, y, "instruction-loop");
            this.instructionText = scene.add.text(x - 44, y - 13, instructionType, {color: "black", fontSize: "18px", align: "left"});
            this.instructionText.depth = 999;
        }
        else {
            super(scene, x, y, "instruction");
            this.instructionText = scene.add.text(x - 44, y - 13, instructionType, {color: "black", fontSize: "18px", align: "left"});
            this.instructionText.depth = 999;
        }

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
            if(this.loopChild){
                this.scene.children.bringToTop(this.loopChild);
            }
        }

        // removes parent relationship from the linked list segment when dragged
        if(this === gameObject){
            if(this.previousInstruction){
                if(this.instructionType === "number"){
                    this.previousInstruction.loopChild = undefined;
                }
                else {
                    this.previousInstruction.nextInstruction = undefined;
                }
                this.previousInstruction = undefined;
            }

            this.moveInstruction(dragX, dragY);
        }
        this.instructionText.depth = 999;
    }    
    
    moveInstruction(dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;

        //text offsets for this instruction
        if(this.instructionType !== "number") {
            this.instructionText.x = dragX - 44;
            this.instructionText.y = dragY - 13;
        }
        else {
            this.instructionText.x = dragX - 6;
            this.instructionText.y = dragY - 18/2;
        }
        
        //if there is a child update it (so that it moves with parent
        if(this.nextInstruction !== undefined) {
            this.nextInstruction.moveInstruction(dragX, dragY + 31);
        }
        if(this.loopChild !== undefined) {
            this.loopChild.moveInstruction(dragX + 11, dragY - 4);
        }
    }

    //snaps objects into place relative to their parent
    snapIntoPlace(){
        if(this.previousInstruction){
            this.moveInstruction(this.previousInstruction.x, this.previousInstruction.y + 31)
        }
    }

    handleDrop(_mouse: Phaser.Input.Pointer, dragTarget: Phaser.GameObjects.GameObject, dropTarget: Phaser.GameObjects.GameObject) {
        
        //keep text on top
        this.instructionText.depth = 999;

        if(dragTarget === this) {
            
            //when im dropped on something that is an instruction, isn't me, and isn't a number
            if(dropTarget instanceof Instruction && dropTarget !== this && dropTarget.instructionType !== "number"){

                    //number specific dropping
                    if(this.instructionType === "number") {

                        //numbers can only be dropped into loops and loops should be empty
                        if(dropTarget.instructionType === "loop" && dropTarget.loopChild === undefined) {
                            
                            //adds it the list
                            this.previousInstruction = dropTarget;
                            this.previousInstruction.loopChild = this;

                            //moves the number that was dropped into place
                            this.moveInstruction(this.previousInstruction.x + 11, this.previousInstruction.y - 4);

                            //brings the number in the loop into place
                            this.scene.children.bringToTop(this);
                        }
                    }
                
                //inserts this instruction into the linked list standard flow
                else if(this.previousInstruction === undefined && dropTarget.nextInstruction === undefined) {
                    this.previousInstruction = dropTarget;
                    this.previousInstruction.nextInstruction = this;
                    this.snapIntoPlace();
                }
            }
        }
    }
}