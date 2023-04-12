//stolen from prof Wassil's refactor homework

export default class Instruction extends Phaser.GameObjects.Image {

    /* CLASS VARIABLE */

    private nextInstruction?: Instruction;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);      

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

        // input.on  drag event  Pointer triggering event, gameObject, x & y
        scene.input.on('drag', this.handleDrag, this);

    }
    // when this is called from other scenes it will pass these values    
    handleDrag(mouse: Phaser.Input.Pointer, gameObject: Instruction, dragX: number, dragY: number) {
        console.log("handleDrag " + this.x + " " + this.y);
        this.x = dragX;
        this.y = dragY;
    }    
   
}