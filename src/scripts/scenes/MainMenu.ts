export default class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'MainMenu' });
        console.log("in main - constructor");
    }

    
    create() {
        const { width, height } = this.sys.game.canvas;

        this.add.text( width/2 , height/2 , "Main Menu" ).setOrigin(0.5).setScale(3);
    }
}