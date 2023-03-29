import Phaser from "phaser";

export default class Crane extends Phaser.Physics.Arcade.Sprite {
    
    /* CRANE CONSTANTS */
    public static readonly MOVEMENT_TIME = 250; //time in milliseconds 
    public static readonly MOVEMENT_VELOCITY = 32 * 1000 / Crane.MOVEMENT_TIME; //speed to move at in units/second 32 units is one "block"

    /* CRANE VARIABLES */

    private isMoving = false;

    private isCarrying = false;
    private carriedObject?:Phaser.Physics.Arcade.Sprite;

    constructor(scene:Phaser.Scene, x:number, y:number, startOpen:boolean) {
        if(startOpen) {
            super(scene, x, y, "craneOpen");
        }
        else {
            super(scene, x, y, "craneClosed");
        }
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setGravity(0, -300);
    }

    public open() {
        this.setTexture('craneOpen');
    }

    public close() {
        this.setTexture('craneClosed');
    }

    public moveDown() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityY(Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveUp() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityY(-Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveLeft() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityX(-Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveRight() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityX(Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }

    private clearMovement() {
        this.setVelocityY(0); 
        this.setVelocityX(0);
        console.log("before adjustments");
        console.log(this.x);
        console.log(this.y)
        this.x = Math.round((this.x-16)/32)*32 + 16;
        this.y = this.scene.sys.game.canvas.height - (Math.round(((this.scene.sys.game.canvas.height - this.y) - 16)/32)*32 + 16);

        console.log("after adjustments");
        console.log(this.x);
        console.log(this.y);

        this.isMoving = false;
    }
}