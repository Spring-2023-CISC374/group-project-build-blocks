//stolen from prof Wassil's refactor homework

import { InstructionType } from "../types/InstructionType";
import Level from "../scenes/Level";

export default class Instruction extends Phaser.GameObjects.Image {

    /* CLASS VARIABLE */
    public instructionType: InstructionType;
    public instructionText;

    public loopChild?: Instruction;
    public loopNumber?: number;

    public nextInstruction?: Instruction;
    public previousInstruction?: Instruction;
    
    public dropAreaLarge: Phaser.Geom.Rectangle;
    public dropAreaSmall: Phaser.Geom.Rectangle;
    public dropArea: Phaser.Geom.Rectangle;
    public beingDragged: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, instructionType: InstructionType, number?: number) {
        
        //number instructions have an additional field and a different sprite
        if(instructionType === "number" && number) {
            super(scene, x, y, "instruction-number");
            this.loopNumber = number;
        }
        //loop instructions have a different sprite
        else if(instructionType === "loop") {
            super(scene, x, y, "instruction-loop");
        }
        else {
            super(scene, x, y, "instruction");
        }

        this.instructionText = scene.make.text({x: x, y: y,
             text: instructionType === "number" && number?number.toString():instructionType, 
             style: {color: "black", fontSize: "18px", fixedWidth: this.width, padding: instructionType === "number" && number?{x: 10, y: 0}:{x: 5, y: 0}},
            }).setOrigin(0.5,0.5);

        this.instructionType = instructionType; 
        this.dropAreaLarge = new Phaser.Geom.Rectangle(0, 0, this.width, this.height*2);
        this.dropAreaSmall = new Phaser.Geom.Rectangle(0, 0, this.width, this.height);
        this.dropArea = this.dropAreaLarge;

        this.setInteractive();
        scene.input.setDraggable(this);
        this.input.dropZone = true;

        this.resetTint();

        this.input.hitAreaCallback = (_hitArea: any, x: number, y: number, gameObject: Phaser.GameObjects.GameObject) => {
            let gameObjectIns = gameObject as Instruction;
            
            const alpha = this.scene.textures.getPixelAlpha(x, y, gameObjectIns.texture.key);
            if(this.nextInstruction !== undefined){
                return (alpha && alpha > 0);
            }
            // console.log((this.scene as Level).currentInstruction);
            if(scene.input.mousePointer.isDown 
                && (this.scene as Level).currentInstruction !== gameObjectIns
                && (this.scene as Level).currentInstruction
                && (this.scene as Level).currentInstruction!.instructionType !== "number"){
                return Phaser.Geom.Rectangle.Contains(gameObjectIns.dropArea, x, y);
            }
            return (alpha && alpha > 0);
        };
        
        
        

        //adds tint effect when hovered over
        this.on('pointerover', () => {
            this.clearTint();
            this.setTint(0x44ff44);
        });

        //removes tint effect when no longer hovered over
        this.on('pointerout', () => {
            this.resetTint();
        });

    }
    
    
    resetTint(){
        this.clearTint()
        switch(this.instructionType) {
            case "left":
            case "right":
            case "up":
            case "down":
                this.setTint(0xFFB000); // light gold
                break;
            case "release":
            case "grab":
                this.setTint(0x648FFF); // light blue
                break;
            case "number":
                this.setTint(0x785EF0); // light purple
                break;
            case "loop":
            case "endloop":
                this.setTint(0xFE6100); // light orange
                break;
            case "start":
                this.setTint(0xDC2664); //light pink
                break;
        }
    }

    showLinks(){
        if(this.instructionType === "number"){
            return;
        }
        let key = this.instructionType==="loop"? "instruction-loop" : "instruction";
        if(this.previousInstruction !== undefined){
            this.setTexture(key+"_linked");
        }else{
            this.setTexture(key);
        }
    }
    
    
    moveInstruction(dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;
        this.instructionText.x = dragX;
        this.instructionText.y = dragY;

        if(this.nextInstruction !== undefined) {
            this.nextInstruction.moveInstruction(dragX, dragY + 31);
        }
        if(this.loopChild !== undefined) {
            this.loopChild.moveInstruction(dragX + 13, dragY - 4);
        }
        
        this.showLinks();
    }

    //snaps objects into place relative to their parent
    snapIntoPlace(){
        if(this.previousInstruction){
            this.moveInstruction(this.previousInstruction.x, this.previousInstruction.y + 31);
        }
    }

}