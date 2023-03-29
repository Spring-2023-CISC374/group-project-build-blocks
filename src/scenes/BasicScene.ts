import Phaser from 'phaser'

export default class BasicScene extends Phaser.Scene {
    /* SCENE VARIABLES */


    /* ESSENTIAL FUNCTIONS */
    constructor() {
        //don't know what this does; it comes from the starter project
		super('hello-world')
	}
    
    preload() {
        this.load.image('background', '../public/assets/TempBackground.png');
	}

    create() {

    }

    update(){

    }

    /* HELPER FUNCTIONS */
}