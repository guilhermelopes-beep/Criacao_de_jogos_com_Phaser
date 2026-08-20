export class Monstro_DEC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'monstro');
        
        scene.add.existing(this);
        
        this.initAnimations();

    }

    initAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('centauro', {start: 0, end: 1}),
            frameRate: 1,
        });

        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers('centauro', {start: 0, end: 1}),
            frameRate: 1,
        });
    }

    idle(){this.anims.play('idle', true);}
    ataque(){this.anims.play('ataque', true);}

}