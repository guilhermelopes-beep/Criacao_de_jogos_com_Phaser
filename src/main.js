import { Boot } from './scenes/Boot.js';
import { GameOver } from './scenes/GameOver.js';
import { Preloader } from './scenes/Preloader.js';
//JOGOS
import { Game_demo } from './scenes/Game_demo.js';
import { Game_DEC } from './scenes/Game_DEC.js';

function demo(){
    const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    fps: {
            max: 60,
            min: 20,
            target: 60
    },
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { 
                y: 500 
            }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Game_demo,
        GameOver
    ]
};

return config;
}

function DEC(){
    const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    fps: {
            max: 60,
            min: 20,
            target: 60
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Game_DEC,
        GameOver
    ]
};

return config;
}

switch (jogo){
    case 'demo':
        var config = demo();
        break;

    case 'DEC':
        var config = DEC();

        break;
    default:
        var config = demo();
        break;
}

const game = new Phaser.Game(config);

console.log('Jogo inicializado!', game);