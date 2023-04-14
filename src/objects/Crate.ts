import Phaser from 'phaser'

import { Color } from '../types/Color';

export default class Crate extends Phaser.Physics.Arcade.Sprite {
    
    /* CRATE VARIABLES */
    private color : Color;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string|Phaser.Textures.Texture, color:Color, frame?:string|number) {
        super(scene, x, y, texture, frame);
        this.color = color;
        this.setColor(color);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    public setColor(color: Color) {
        this.color = color;
        switch(this.color) {
            case "none":
                this.clearTint;
                break;
            case "red":
                this.setTint(0xFF0000);
                break;
            case "green":
                this.setTint(0x00FF00);
                break;
            case "blue":
                this.setTint(0x0A3EFF);
                break;
            default:
                this.clearTint;
                break;
          }
    }

    public getColor() {
        return this.color;
    }
}