class mode{

    ctx = document.getElementById('mode').getContext('2d');
    
    type = 1;
    music = 1;
    mode = 1;
    step = 1;

    constructor(){

        var img = new Image();
        var self = this.ctx;
        img.addEventListener('load', function(){

            self.drawImage(img, 0, 0,443,399);

        });

        img.src = 'img/select_mode.png';

       m.stop(); 
       m.play("typea");

       this.move();

    }




    move(){


        document.addEventListener("keydown", e => {

            if(scene == 2){
    
                if(this.mode == 1)
                {

                    if(e.keyCode === 37){
    
                        this.type = 1;
                        document.querySelector('.game-a').classList.add('game-mode-sel');
                        document.querySelector('.game-b').classList.remove('game-mode-sel');
                        
                
                    }else if(e.keyCode === 39){
                        
                        document.querySelector('.game-a').classList.remove('game-mode-sel');
                        document.querySelector('.game-b').classList.add('game-mode-sel');
                        this.type = 2;
        
                    }else if(e.keyCode === 13){


                        this.mode = 2;
                        if(this.type == 1){

                            document.querySelector('.game-a').classList.remove('game-mode-sel');
                            document.querySelector('.game-a').style.opacity = 1;

                        }else{

                            document.querySelector('.game-b').classList.remove('game-mode-sel');
                            document.querySelector('.game-b').style.opacity = 1;
                        }


                        document.querySelector('.theme-a').classList.add('game-mode-sel');



                    }

                }else if(this.mode == 2){


                   if(this.music == 1){


                        if(e.keyCode === 39){

                            this.quitarSelect();
                            document.querySelector('.theme-b').classList.add('game-mode-sel');
                            this.music = 2;
                            m.stop();
                            m.play("typeb");
                            
                        
                        }else  if(e.keyCode === 40){

                            this.quitarSelect();
                            document.querySelector('.theme-c').classList.add('game-mode-sel');
                            this.music = 3;
                            m.stop();
                            m.play("typec");

                        }


                    }else if(this.music == 2){


                        if(e.keyCode === 37){

                            this.quitarSelect();
                            document.querySelector('.theme-a').classList.add('game-mode-sel');
                            this.music = 1;
                            m.stop();
                            m.play("typea");
                        
                        }else  if(e.keyCode === 40){

                            this.quitarSelect();
                            document.querySelector('.theme-d').classList.add('game-mode-sel');
                            this.music = 4;
                            m.stop();
                            m.play("typed");

                        }


                    }else if(this.music == 3){


                        if(e.keyCode === 38){

                            this.quitarSelect();
                            document.querySelector('.theme-a').classList.add('game-mode-sel');
                            this.music = 1;
                            m.stop();
                            m.play("typea");
                        
                        }else  if(e.keyCode === 39){

                            this.quitarSelect();
                            document.querySelector('.theme-d').classList.add('game-mode-sel');
                            this.music = 4;
                            m.stop();
                            m.play("typed");

                        }


                    }else if(this.music == 4){


                        if(e.keyCode === 38){

                            this.quitarSelect();
                            document.querySelector('.theme-b').classList.add('game-mode-sel');
                            this.music = 2;
                            m.stop();
                            m.play("typeb");
                        
                        }else  if(e.keyCode === 37){

                            this.quitarSelect();
                            document.querySelector('.theme-c').classList.add('game-mode-sel');
                            this.music = 3;
                            m.stop();
                            m.play("typec");

                        }


                    }



                    if(e.keyCode === 13){

                        document.querySelector('#start').classList.add('ocultar');
                        document.querySelector('#player').classList.remove('ocultar');
                        document.querySelector('#config').classList.add('ocultar');
                        isInicio = false;
                        scene = 3;
                        playerReset();
                        update();

                    }



                }
                
    
            }
        
            
        });


    }



    quitarSelect(){

        document.querySelector('.theme-a').classList.remove('game-mode-sel');
        document.querySelector('.theme-a').classList.remove('game-mode-defual');
        document.querySelector('.theme-b').classList.remove('game-mode-sel');
        document.querySelector('.theme-c').classList.remove('game-mode-sel');
        document.querySelector('.theme-d').classList.remove('game-mode-sel');
       

    }

}


