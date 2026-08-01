import { Enemy_demo } from '../gameObjects/Enemy_demo.js';
import { Player_demo } from '../gameObjects/Player_demo.js';

export class Game_demo extends Phaser.Scene {
    constructor() {super('Game_demo');}
    
    create() {
        this.create_backgroud();
        this.create_platforms();
        this.create_objects();
        this.create_colliders();
        this.create_hud();
        this.create_controls();        
        this.create_camera();
    }

    update() {
        this.update_enemy_move();
        this.update_move();
    }

    collectStar (player, star){
        star.disableBody(true, true);

        this.score += 1;
        this.scoreText.setText('Pontuação: '+ this.score);

        if (this.score >= 10){
            this.physics.pause();
            player.setTint(0xffff00);

            player.anims.play('turn');

            this.time.delayedCall(2000, () => {
                this.scene.start('GameOver');
            });
        }


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
        var arrow = this.arrows.create(this.player.x, this.player.y, 'arrow').setSize(10, 10);
        arrow.body.allowGravity = false;
        
        

        switch (direction){
            case 'L':
                arrow.setVelocity(-300, 0);                
                arrow.setScale(-1, 1);
                
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
            default:
                arrow.setVelocity(0, 500);
                break;
        }
    }    

    create_backgroud(){
            
        let contador = -1;

        while (contador < 4){
            
            this.add.image(400*contador, 300, 'sky');

            contador+=1;
        }
    }

    create_platforms(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        let contadorW = -1;

        while (contadorW < 4){
            
            let aleatorio = Math.random()*2
                        
            let x = 1000*aleatorio
            let y = 800*aleatorio

            this.platforms.create(x, y, 'ground');

            contadorW+=1;
        }
    }

    create_objects(){
        //JOGADOR
        this.player = new Player_demo(this, 100, 450);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70}
        });

        this.inimigo = new Enemy_demo(this, 600, 0);

        this.bombs = this.physics.add.group();

        this.arrows = this.physics.add.group();

        
        /*
        let contadorI = 0;
        while (contadorI < 3){
            this.inimigo = new Enemy(this, 300*contadorI, 0);
            contadorI += 1;
        }*/

    }

    create_colliders(){
        this.physics.add.collider(this.player, this.platforms);                
        this.physics.add.collider(this.inimigo, this.platforms);
        this.physics.add.collider(this.inimigo, this.player);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.stars, this.stars);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.collider(this.arrows, this.platforms, this.arrowHitGround, null, this);
        this.physics.add.collider(this.arrows, this.bombs, this.hitBombWArrow, null, this);
        this.physics.add.collider(this.arrows, this.stars, this.hitBombWArrow, null, this);
        


    }

    create_hud(){
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });
        this.life = 10;
        this.lifeText = this.add.text(16, 48, 'Vida: 10', { fontSize: '32px', fill: '#000' });
    }

    create_controls(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaA = this.input.keyboard.addKey('A');
        this.teclaW = this.input.keyboard.addKey('W');
        this.teclaS = this.input.keyboard.addKey('S');
        this.teclaD = this.input.keyboard.addKey('D');
        this.teclaX = this.input.keyboard.addKey('X');
        this.teclaZ = this.input.keyboard.addKey('Z');        
    }
    create_camera(){
        // inside your scene's create() method
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // optional: set bounds so the camera doesn't show outside the world
        this.cameras.main.setBounds(0, 0, 1200, 800);
    }

    update_enemy_move(){
        if(this.player.x < this.inimigo.x){
            this.inimigo.moveLeft();
        } 
        else if (this.player.x > this.inimigo.x){
            this.inimigo.moveRight();
        }
        else{
            this.inimigo.idle();
        }

        if((this.player.y - this.inimigo.y)>1){
            this.inimigo.jump();
        } 
        else if (this.player.x > this.inimigo.x){
            //this.inimigo.crouch();
        }
    }
    
    update_move(){
        var attack_direction = '';
        
        if (this.cursors.left.isDown || this.teclaA.isDown){
            this.player.moveLeft();
            attack_direction = 'L';
        }

        else if (this.cursors.right.isDown || this.teclaD.isDown){
            this.player.moveRight();
            attack_direction = 'R';
        }

        else{
            this.player.idle();
        }


        if (this.cursors.space.isDown || this.teclaZ.isDown){
            this.player.jump();
            attack_direction = 'T';
        }
        else if(this.cursors.down.isDown  || this.teclaS.isDown){
            this.player.crouch();
            attack_direction = 'D';
        }
        
        if (this.teclaX.isDown){
            this.attack(attack_direction);
        }
    }

}
