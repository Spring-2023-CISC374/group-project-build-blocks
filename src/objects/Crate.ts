import Phaser from 'phaser'

import { Color } from '../types/Color';

export default class Crate extends Phaser.Physics.Arcade.Sprite {
    
    /* CRATE VARIABLES */
    private color : Color;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:Phaser.Textures.Texture, color:Color, frame?:string|number) {
        super(scene, x, y, texture, frame);
        this.color = color;
    }
}