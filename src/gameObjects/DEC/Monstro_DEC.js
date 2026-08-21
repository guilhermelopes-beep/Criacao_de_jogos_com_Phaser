export class Monstro_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, monstro){
        super(scene, x, y, monstro);
        
        scene.add.existing(this);

        this.sprite = monstro;
        
        this.initAnimations();

    }

    initAnimations(){
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.sprite, {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers(this.sprite, {start: 0, end: 1}),
            frameRate: 6,
            repeat: -1
        });
    }

    idle(){this.anims.play('idle', true);}
    ataque(){this.anims.play('ataque', true);}

}