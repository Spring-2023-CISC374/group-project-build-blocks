import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	
    private platforms?: Phaser.Physics.Arcade.StaticGroup
    private player?: Phaser.Physics.Arcade.Sprite
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private stars?: Phaser.Physics.Arcade.Group
    private wrenches?: Phaser.Physics.Arcade.Group

    private score = 0
    private scoreText?: Phaser.GameObjects.Text
    private lives = 3
    private livesText?: Phaser.GameObjects.Text

    private bombs?: Phaser.Physics.Arcade.Group

    private lasers?: Phaser.Physics.Arcade.Group

    private gameOver = false

    constructor() {
		super('hello-world')
	}

	preload() {
        this.load.image('sky', 'assets/crane.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/greenRock.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.image('wrench', 'assets/wrench.png')
        this.load.image('laser', 'assets/PlayerProjectile.png')
        this.load.spritesheet('dude', 'assets/PlayerShip.png', {frameWidth: 32, frameHeight: 48})
	}

	create() {
        const background = this.add.image(400, 280, 'sky')
        background.setScale(2)
        //this.add.image(400, 300, 'star')

        this.platforms = this.physics.add.staticGroup()
        const ground = this.platforms.create(400, 568, 'ground') as Phaser.Physics.Arcade.Sprite
        
        ground.setScale(2)
        ground.refreshBody()
            
        //br
        this.platforms.create(300, 400, 'ground')
        
        //left
        this.platforms.create(150, 250, 'ground')
        
        //tr
        this.platforms.create(750, 120, 'ground')

        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

/*        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0, end: 3
            
            }),
            frameRate: 10,
            repeat: -1
        })
        
        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5, end: 8
            
            }),
            frameRate: 10,
            repeat: -1
        })
*/
        this.physics.add.collider(this.player, this.platforms)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70 }
        })

        this.wrenches = this.physics.add.group({
            key: 'wrench',
            repeat: 3,
            setXY: {x: 12, y: 0, stepX: 250 }
        })

        this.stars.children.iterate(c => {
            const child = c as Phaser.Physics.Arcade.Image
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        this.physics.add.collider(this.wrenches, this.platforms)
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.overlap(this.player, this.stars, (player, s) => {
            this.handleCollectStar(player, s);
         }, undefined, true );
         
        this.livesText = this.add.text(600, 16, 'Lives: 3', {
            fontSize: '32px',
            color: '#000'
        });

        this.scoreText = this.add.text(16, 16, 'score: 0 - \nShoot lasers to destroy bombs when \npicking up energy\nwrenchs heal you', {
            fontSize: '32px',
            color: '#000'
        });

        this.lasers = this.physics.add.group()
        this.bombs = this.physics.add.group()
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.bombs, this.handleHitBomb, undefined, this)
        this.physics.add.overlap(this.lasers, this.bombs, (laser, bomb) => {
            this.handleDestroyBomb(laser, bomb);
         }, undefined, true );

         this.physics.add.overlap(this.player, this.wrenches, (player, w) => {
            this.handleCollectWrench(player, w);
         }, undefined, true );

    }

    private handleHitBomb(player: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        
        const bomb = b as Phaser.Physics.Arcade.Image
        bomb.disableBody(true, true)
        
        this.lives -= 1
        this.livesText?.setText('Lives ' + this.lives.toString())
        if(this.lives === 0) {
            this.physics.pause()
            this.player?.setTint(0xff0000)

            this.gameOver = true
        }
    }

    private handleCollectWrench(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject){
        const wrench = s as Phaser.Physics.Arcade.Image
        wrench.disableBody(true, true)
        this.lives += 1
        this.livesText?.setText('Lives ' + this.lives.toString())
    }

    private handleDestroyBomb(laser: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        const bomb = b as Phaser.Physics.Arcade.Image
        bomb.disableBody(true, true)
    }

    private handleCollectStar(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const star = s as Phaser.Physics.Arcade.Image
        star.disableBody(true, true)

        console.log("test\n");

        this.score = this.score + 10
        this.scoreText?.setText('Score ' + this.score.toString())

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate(c => {
                const child = c as Phaser.Physics.Arcade.Image
                child.enableBody(true, child.x, 0, true, true)
            })
            if(this.player) {
            const x = this.player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400)
            const wrench: Phaser.Physics.Arcade.Image = this.wrenches?.create(x, 16, 'wrench')
            wrench.setBounce(0)
            wrench.setCollideWorldBounds(true)
            wrench.setVelocityY(Phaser.Math.Between(-200, 200))
            }
        }
        if(this.player) {
            const x = this.player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400)

            const bomb: Phaser.Physics.Arcade.Image = this.bombs?.create(x, 16, 'bomb')
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true)
            bomb.setVelocityY(Phaser.Math.Between(-200, 200))
        }
        const laser: Phaser.Physics.Arcade.Image = this.lasers?.create(this.player?.x, this.player?.y, 'laser')
                laser.setBounce(1)
                laser.setCollideWorldBounds(false)
                laser.setVelocityY(-800)

    }

    update(){
        if(!this.cursors) {
            return
        }

        if(this.cursors.left.isDown) {
            this.player?.setVelocityX(-160)
            //this.player?.anims.play('left', true)
        }
        else if (this.cursors.right?.isDown){
            this.player?.setVelocityX(160)
            //this.player?.anims.play('right', true)
        }
        else {
            this.player?.setVelocityX(0)
            //this.player?.anims.play('turn')
        }

        if(this.cursors.up?.isDown && this.player?.body.touching.down){
            this.player.setVelocityY(-330)
        }

    }
}
