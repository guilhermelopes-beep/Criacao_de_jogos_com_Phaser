import { Monstro_DEC } from '../gameObjects/DEC/Monstro_DEC.js';
import { Jogador_DEC } from '../gameObjects/DEC/Jogador_DEC.js';


export class Game_DEC extends Phaser.Scene {
    constructor() {super('Game_DEC');}
    
    create() {
        this.create_backgroud();
        this.create_objects();
        this.create_hud();
        this.create_camera();
        this.create_controls();
    }

    update() {
        this.update_move();
    }

    create_backgroud(){      
        let contador = -1;

        while (contador < 4){
            
            this.add.image(400*contador, 300, 'sky');

            contador+=1;
        }
    }

    create_objects(){
        
        this.jogador = new Jogador_DEC(this, 100, 450, 'bruxa');
        this.jogador2 = new Jogador_DEC(this, 200, 450, 'centauro');
        let inimigo_pos = Math.random();
        
        
        this.inimigo = new Monstro_DEC(this, (inimigo_pos+0.3)*600, (inimigo_pos+0.4)*200,'bruxa');
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

    create_hud(){
        this.life = 10;
        this.lifeText = this.add.text(16, 16, 'Vida: 10', {fontFamily:'Clarity' , fontSize: '32px', fill: '#000' });
    }

    create_camera(){
        // inside your scene's create() method
        this.cameras.main.startFollow(this.jogador, true, 0.05, 0.05);

        // optional: set bounds so the camera doesn't show outside the world
        this.cameras.main.setBounds(0, 0, 800, 600);
    }
    
    update_move(){        
        this.inimigo.idle();

        var attack_direction = '';
        
        if (this.teclaA.isDown){
            this.jogador.moveLeft();
            attack_direction = 'L';
        }

        else if (this.teclaD.isDown){
            this.jogador.moveRight();
            attack_direction = 'R';
        }

        else{
            this.jogador.idle();
        }

        if (this.teclaW.isDown){
            this.jogador.jump();
            attack_direction = 'T';
        }
        else if(this.teclaS.isDown){
            this.jogador.crouch();
            attack_direction = 'D';
        }
        /////////JOGADOR 2

        if (this.cursors.left.isDown){
            this.jogador2.moveLeft();
            attack_direction = 'L';
        }

        else if (this.cursors.right.isDown){
            this.jogador2.moveRight();
            attack_direction = 'R';
        }

        else{
            this.jogador2.idle();
        }


        if (this.cursors.up.isDown){
            this.jogador2.jump();
            attack_direction = 'T';
        }
        else if(this.cursors.down.isDown){
            this.jogador2.crouch();
            attack_direction = 'D';
        }
 
 
    }
    
}