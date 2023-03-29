import Phaser from "phaser";

export default class Crane extends Phaser.Physics.Arcade.Sprite {
    
    /* CRANE CONSTANTS */
    public static readonly MOVEMENT_TIME = 500;
    public static readonly MOVEMENT_VELOCITY = 32 * 1000 / Crane.MOVEMENT_TIME;

    /* CRANE VARIABLES */

    private isMoving = false;
    private clearX = 0;
    private clearY = 0;

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
            this.clearX = this.x;
            this.clearY = this.y + 32;
            this.setVelocityY(Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveUp() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.clearX = this.x;
            this.clearY = this.y - 32;
            this.setVelocityY(-Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveLeft() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.clearX = this.x - 32;
            this.clearY = this.y;
            this.setVelocityX(-Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveRight() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.clearX = this.x + 32;
            this.clearY = this.y;
            this.setVelocityX(Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }

    private clearMovement() {
        this.setVelocityY(0); 
        this.setVelocityX(0);
        this.x = this.clearX;
        this.y = this.clearY;
        this.isMoving = false;
    }
}