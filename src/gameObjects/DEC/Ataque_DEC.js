export class Ataque_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, ataque){
        super(scene, x, y, ataque);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.sprite = ataque;

        this.initAnimations();
    }

    initAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.sprite, {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
    }

    idle(){
        this.anims.play('idle', true);
    }
}