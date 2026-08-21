import { Monstro_DEC } from '../gameObjects/DEC/Monstro_DEC.js';
import { Jogador_DEC } from '../gameObjects/DEC/Jogador_DEC.js';


export class Game_DEC extends Phaser.Scene {
    constructor() {super('Game_DEC');}
    
    create() {
        this.create_backgroud();
        this.create_objects();
        this.create_hud();
        this.create_camera();
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
        
        this.jogador = new Jogador_DEC(this, 100, 450, 'vampiro');
        this.jogador2 = new Jogador_DEC(this, 200, 450, 'centauro');
        let monstro = Math.random();
        
        
        this.inimigo = new Monstro_DEC(this, 600, 200,'bruxa');
    }

    create_hud(){
        this.life = 10;
        this.lifeText = this.add.text(16, 16, 'Vida: 10', {fontFamily:'Georgia' , fontSize: '32px', fill: '#000' });
    }

    create_camera(){
        // inside your scene's create() method
        this.cameras.main.startFollow(this.jogador, true, 0.05, 0.05);

        // optional: set bounds so the camera doesn't show outside the world
        this.cameras.main.setBounds(0, 0, 800, 600);
    }
    
    update_move(){        
        this.jogador.idle();
        this.jogador2.idle();
    }

}
