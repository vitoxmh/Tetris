class managerSound{

    audio = null;
    path = "sound/";



    play(theme){

        switch(theme){

            case "rotate":

                this.audio = new Audio(this.path+"rotate.wav");

            break;
            case "move_piece":

                this.audio = new Audio(this.path+"move_piece.wav");
                
            break;
            case "piece_landed":

                this.audio = new Audio(this.path+"piece_landed.wav");
                
            break;


           

        }
      
        this.audio.play();

    }



    stop(){

        this.audio.pause();

    }

}


class managerMusic{

    audio = null;
    path = "music/";

    play(theme){

        switch(theme){

            case "typea":

                this.audio = new Audio(this.path+"typeA.mp3");

            break;
            case "typeb":

                this.audio = new Audio(this.path+"typeB.mp3");

            break;
            case "typec":

                this.audio = new Audio(this.path+"typeC.mp3");

            break;
            case "typed":

                this.audio = new Audio(this.path+"typeD.mp3");

            break;


            case "intro":

                this.audio = new Audio(this.path+"intro.mp3");

            break;

        }
        this.audio.loop = true;
        this.audio.play();

    }


    stop(){

        this.audio.pause();
    }

}



function stringToImg(string){

    let html = "";

    const numero = new String(string);

    for(let i = 0; i < numero.length; i++){

       html += "<img src='img/"+numero[i]+".png'>";

    }


    return html;



}


const s =  new  managerSound();
const m = new managerMusic();