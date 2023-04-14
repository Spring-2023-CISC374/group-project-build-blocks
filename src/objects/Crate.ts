import Phaser from 'phaser'

import { Color } from '../types/Color';

export default class Crate extends Phaser.Physics.Arcade.Sprite {
    
    /* CRATE VARIABLES */
    private color : Color;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:Phaser.Textures.Texture, color:Color, frame?:string|number) {
        super(scene, x, y, texture, frame);
        this.color = color;
    }

    public checkOverlap(crate: Crate) {
        const xdiff = Math.abs( this.body.position.x - crate.body.position.x );
        const ydiff = Math.abs( this.body.position.y - crate.body.position.y );
        const diff = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        console.log(diff);
        return diff < 0.1;
    }
    
}