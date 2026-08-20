export class Boot extends Phaser.Scene{
    constructor (){super('Boot');}

    preload (){
        switch (jogo){
            case 'demo':
                this.preload_demo();
                break;
            case 'DEC':
                
                break;
            default:
                this.preload_demo();
                break;
        }
    }

    create (){this.scene.start('Preloader');}


    preload_demo(){
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.setPath('assets/demo');
        this.load.image('background', 'bg.png');
        this.load.image('phaser', 'phaser.png')
        
    }
}
