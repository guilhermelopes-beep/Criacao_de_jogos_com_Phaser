export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'carangueijo');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.initAnimations();

    }

    initAnimations(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('carangueijo', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('carangueijo', {start: 0, end: 1}),
            frameRate: 1,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('carangueijo', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft(){
        this.setVelocityX(-100);
        this.anims.play('left', true);
    }
    moveRight(){
        this.setVelocityX(100);
        this.anims.play('right', true);

    }

    idle(){
        this.anims.play('idle', true);
    }

    jump(){
        if (this.body.blocked.down){
        this.setVelocityY(-500);
        }
    }
    crouch(){
        if (this.body.blocked.down){
        this.setVelocityY(500);
        }
    }


}