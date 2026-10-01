export class Jogador_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, jogador){
        super(scene, x, y, jogador);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.sprite = jogador;
        this.idle_start = 0;
        this.idle_end = 1;

        switch (jogador){
            case 'centauro':
                this.idle_end = 3;
                break;

            case 'vampiro':
                this.idle_end = 3;
                break;

            case 'demonio':
                this.idle_end = 4;
                break;

            case 'demonio-pulador':
                this.idle_end = 5;
                break;

            case 'amaldicoado':
                this.idle_end = 4;
                break;

            case 'bruxa':
                this.idle_end = 4;
                break;
            

            default:
                this.idle_start = 0;
                this.idle_end = 1;
                break;
        }        

        this.initAnimations();    }

    initAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.sprite, {start: this.idle_start, end: this.idle_end}),
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft(){
        if (!this.body.blocked.left){
        this.setVelocityX(-200);
        this.setVelocityY(0);
        this.anims.play('idle', true);
        }
    }
    moveRight(){
        if (!this.body.blocked.right){
        this.setVelocityX(200);
        this.setVelocityY(0);
        this.anims.play('idle', true);
        }
    }
    idle(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.anims.play('idle');
    }
    jump(){
        if (!this.body.blocked.up){
        this.setVelocityY(-200);
        this.setVelocityX(0);
        this.anims.play('idle');
        }
    }
    crouch(){
        if (!this.body.blocked.down){
        this.setVelocityY(200);
        this.setVelocityX(0);
        this.anims.play('idle');
        }
    }
}