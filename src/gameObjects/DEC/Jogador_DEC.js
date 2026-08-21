export class Jogador_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, jogador){
        super(scene, x, y, jogador);
        
        scene.add.existing(this);
        
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

    idle(){
        this.anims.play('idle', true);
    }
}