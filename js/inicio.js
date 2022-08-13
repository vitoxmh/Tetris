var isInicio = true;
var scene = 1;

function inicio(){



    var ctx = document.getElementById('inicio').getContext('2d');

    m.play("intro");

    var img = new Image();
    img.addEventListener('load', function(){

        ctx.drawImage(img, 0, 0,443,399);

    });

    img.src = 'img/inicio.png';



    document.addEventListener("keydown", e => {

        if(scene == 1){

       
            if(e.keyCode === 13){

                if(this.nplayer == 1){

                    document.querySelector('#start').classList.add('ocultar');
                    document.querySelector('#config').classList.remove('ocultar');
                    isInicio = false;
                    scene = 2;
                    var mo = new mode();

                    
                }

            }else if(e.keyCode === 37){

                this.nplayer = 1;

                document.querySelector('#start .arrow').classList.remove('player2');
                

            }else if(e.keyCode === 39){
            
                this.nplayer = 2;
                document.querySelector('#start .arrow').classList.add('player2');

            }

        }
    
        
    });

}


inicio();