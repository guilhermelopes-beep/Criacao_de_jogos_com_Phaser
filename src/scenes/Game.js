import { Player } from '../gameObjects/Player.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    
    create() {
        
        this.add.image(400, 300, 'sky');
       
        this.platforms = this.physics.add.staticGroup();
    

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this, 100, 450);

        this.physics.add.collider(this.player, this.platforms);
        
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70}
        });


        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.stars, this.stars);
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        this.arrows = this.physics.add.group();
        
        this.physics.add.collider(this.arrows, this.platforms, this.arrowHitGround, null, this);
        this.physics.add.collider(this.arrows, this.bombs, this.hitBombWArrow, null, this);
        this.physics.add.collider(this.arrows, this.stars, this.hitBombWArrow, null, this);
        

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });
        this.life = 2;

        this.lifeText = this.add.text(16, 48, 'Vida: 2', { fontSize: '32px', fill: '#000' });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.teclaA = this.input.keyboard.addKey('A');
        this.teclaW = this.input.keyboard.addKey('W');
        this.teclaS = this.input.keyboard.addKey('S');
        this.teclaD = this.input.keyboard.addKey('D');

        
    }

    update() {
        
        
        if (this.cursors.left.isDown || this.teclaA.isDown){
            this.player.moveLeft();
            this.attack('L');
        }

        else if (this.cursors.right.isDown || this.teclaD.isDown){
            this.player.moveRight();
            this.attack('R');
        }

        else{
            this.player.idle();
        }


        if (this.cursors.space.isDown || this.cursors.up.isDown || this.teclaW.isDown){
            this.player.jump();
            this.attack('T');
        }
        else if(this.cursors.down.isDown  || this.teclaS.isDown){
            this.player.crouch();
            this.attack('D');
        }
    }

    collectStar (player, star){
        star.disableBody(true, true);

        this.score += 1;
        this.scoreText.setText('Pontuação: '+ this.score);

        this.releaseBomb();

    }

    hitBomb (player, bomb){
        this.life -= 1;
        this.lifeText.setText('Vida: '+ this.life);

        bomb.disableBody(true, true);

        if(this.life == 0){
            this.physics.pause();
            player.setTint(0xff0000);

            player.anims.play('turn');

            this.time.delayedCall(2000, () => {
                this.scene.start('GameOver');
            });
        }
    }

    hitBombWArrow(arrow, anything){
        arrow.destroy(true, true);
        anything.destroy(true, true);
    }
    arrowHitGround(arrow, ground){
        arrow.disableBody(true, true);
    }

    releaseBomb(){
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    attack(direction){
        var arrow = this.arrows.create(this.player.x, this.player.y, 'arrow');
        arrow.body.allowGravity = false;
        switch (direction){
            case 'L':
                arrow.setVelocity(-300, 0);                
                break;
            case 'R':
                arrow.setVelocity(300, 0);                
                break;
            case 'T':
                arrow.setVelocity(0, -500);
                break;
            case 'D':
                arrow.setVelocity(0, 500);
                break;
        }
    }    
}
