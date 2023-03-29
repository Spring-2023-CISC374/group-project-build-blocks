import Phaser from "phaser";

export default class Crane extends Phaser.Physics.Arcade.Sprite {
    
    /* CRANE CONSTANTS */
    public static readonly MOVEMENT_TIME = 500;
    public static readonly MOVEMENT_VELOCITY = 32 * 1000 / Crane.MOVEMENT_TIME;

    /* CRANE VARIABLES */

    private isMoving = false;

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
            console.log("moving!");
            this.isMoving = true;
            this.setVelocityY(Crane.MOVEMENT_VELOCITY);
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }

    private clearMovement() {
        this.setVelocityY(0); 
        this.setVelocityX(0);
        this.isMoving = false;
        console.log("done moving!");
    }
}