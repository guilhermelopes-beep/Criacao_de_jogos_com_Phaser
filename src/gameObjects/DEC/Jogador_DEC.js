export class Jogador_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, jogador){
        super(scene, x, y, jogador);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.sprite = jogador;

        this.initAnimations();

    }

    initAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.sprite, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft(){
        this.setVelocityX(-200);
        //this.anims.play('left', true);
    }
    moveRight(){
        this.setVelocityX(200);
        //this.anims.play('right', true);

    }
    idle(){
        this.setVelocityX(0);
        this.anims.play('idle');
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