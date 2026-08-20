export class Jogador_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'vampiro');
        
        scene.add.existing(this);
        
        this.initAnimations();

    }

    initAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('vampiro', {start: 0, end: 3}),
            frameRate: 10,
        });
    }

    idle(){
        this.anims.play('idle');
    }
}