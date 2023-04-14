import Phaser from "phaser";

export default class Crane extends Phaser.Physics.Arcade.Sprite {
    
    /* CRANE CONSTANTS */
    public static readonly MOVEMENT_TIME = 250; //time in milliseconds 
    public static readonly MOVEMENT_VELOCITY = 32 * 1000 / Crane.MOVEMENT_TIME; //speed to move at in units/second 32 units is one "block"

    public static readonly PICKUP_BOX_OFFSET = 24;

    /* CRANE VARIABLES */

    public PICKUP_BOX: Phaser.Physics.Arcade.Sprite;

    private isMoving = false;
    private isCarrying = false;
    private carriedObject?:Phaser.Physics.Arcade.Sprite;
    public toGrab?: Phaser.Physics.Arcade.Sprite;

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

        this.PICKUP_BOX = new Phaser.Physics.Arcade.Sprite(scene, x, y + Crane.PICKUP_BOX_OFFSET, "cranePickupBox");
        scene.add.existing(this.PICKUP_BOX);
        scene.physics.add.existing(this.PICKUP_BOX);
        this.PICKUP_BOX.setGravity(0, -300);
        this.PICKUP_BOX.setVisible(false);

    }

    public release() {
        if(this.isCarrying && this.carriedObject !== undefined) {
            this.carriedObject.setGravityY(0);
            this.carriedObject = undefined;
            this.isCarrying = false;
            console.log("released");
        }
        this.setTexture('craneOpen');
    }

    public grab() {
        if(!this.isCarrying && this.toGrab !== undefined) {
            this.isCarrying = true;
            this.carriedObject = this.toGrab;
            this.carriedObject?.setGravityY(-300);
            console.log("grabbed");
        }
        this.setTexture('craneClosed');
    }
     
    public moveDown() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityY(Crane.MOVEMENT_VELOCITY);
            if(this.carriedObject !== undefined) {
                this.carriedObject.setVelocityY(Crane.MOVEMENT_VELOCITY)
            }
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveUp() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityY(-Crane.MOVEMENT_VELOCITY);
            if(this.carriedObject !== undefined) {
                this.carriedObject.setVelocityY(-Crane.MOVEMENT_VELOCITY)
            }
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveLeft() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityX(-Crane.MOVEMENT_VELOCITY);
            if(this.carriedObject !== undefined) {
                this.carriedObject.setVelocityX(-Crane.MOVEMENT_VELOCITY)
            }
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }
    
    public moveRight() {
        if(!this.isMoving) {
            this.isMoving = true;
            this.setVelocityX(Crane.MOVEMENT_VELOCITY);
            if(this.carriedObject !== undefined) {
                this.carriedObject.setVelocityX(Crane.MOVEMENT_VELOCITY)
            }
            this.scene.time.delayedCall(Crane.MOVEMENT_TIME, () => this.clearMovement());
        }
    }

    private clearMovement() {
        //stop everything from moving
        this.setVelocityY(0); 
        this.setVelocityX(0);
        if(this.carriedObject !== undefined) {
            this.carriedObject.setVelocityY(0);
            this.carriedObject.setVelocityX(0);
        }
        
        //snap crane to place
        this.x = Math.round((this.x-16)/32)*32 + 16;
        this.y = this.scene.sys.game.canvas.height - (Math.round(((this.scene.sys.game.canvas.height - this.y) - 16)/32)*32 + 16);
        
        //snap pickup detector to place
        this.PICKUP_BOX.x = this.x;
        this.PICKUP_BOX.y = this.y + Crane.PICKUP_BOX_OFFSET;
        
        //snap carried object to place
        if(this.carriedObject !== undefined) {
            this.carriedObject.x = Math.round((this.carriedObject.x-16)/32)*32 + 16;
            this.carriedObject.y = this.scene.sys.game.canvas.height - (Math.round(((this.scene.sys.game.canvas.height - this.carriedObject.y) - 16)/32)*32 + 16);
        }
        
        this.isMoving = false;
        console.log(this.toGrab === undefined)
    }
}