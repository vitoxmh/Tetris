var columna = 10;
var filas = 20;
var celda = 25;
var ancho = columna * celda;
var alto = filas * celda;
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var fr = 30;
let lastTime = 0;
let dropInterval = 1000;
let dropCounter = 0;
var inicio = true;
const nextPieceContent = document.getElementById('nextPiece');
const nextPiece = nextPieceContent.getContext('2d');

const colors = [
    null,
    0,
    16,
    32,
    48,
    64,
    80,
    96,
    112,
    128
];


const block = new Image();

block.src = "img/block.png";

const player = {
    pos: {x:0,y:0},
    matriz: null,
    next: null,
    score: 0,
    level: 1,
    lines: 0
}
const grid = createMatriz(10,20);


ctx.scale(20,20);
nextPiece.scale(19,19);


function createPiece(tipo){

    if(tipo === 'T'){

        return [
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ];
    }else if(tipo === 'O'){
        return [
            [2,2],
            [2,2]
        ];
    }else if(tipo === 'L'){
        return [
            [0,3,0],
            [0,3,0],
            [0,3,3]
        ];
    }else if(tipo === 'J'){
        return [
            [0,4,0],
            [0,4,0],
            [4,4,0]
        ];
    }else if(tipo === 'I'){
        return [
            [0,5,0,0],
            [0,6,0,0],
            [0,6,0,0],
            [0,7,0,0]
        ];
    }else if(tipo === 'S'){
        return [
            [0,8,8],
            [8,8,0],
            [0,0,0]
        ];
    }else if(tipo === 'Z'){
        return [
            [9,9,0],
            [0,9,9],
            [0,0,0]
        ];
    }


}

function createMatriz(w,h){

    const matriz = [];

    while(h--){
        matriz.push(new Array(w).fill(0));
    }


    return matriz;
    
}


function drawMatriz(matriz,offset){


    matriz.forEach((row,y) => {

        row.forEach((value,x) => {

            if(value !== 0){
                
                ctx.drawImage(block, colors[value] , 0, 16,16,x + offset.x,y + offset.y,1,1);

            }

        });
    });



    ctx.fillStyle = "#000";


}


function fondo(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,21,415);

}


function drawMatrizNext(matriz,offset){

    nextPiece.fillStyle = "#F8F8F8";
    nextPiece.fillRect(0,0,nextPieceContent.width,nextPieceContent.height);

    

    const pos = {
        x: 0,
        y: 0
    }

    matriz.forEach((row,y) => {

        row.forEach((value,x) => {

            if(value !== 0){
                
                if(value == 9){
                    
                    pos.x = 0.5;
                    pos.y = 0.8; 

                }else if(value == 4){

                    pos.x = 0.8;
                    pos.y = 0.5;
                }else if(value == 3){

                    pos.x = 0.25;
                    pos.y = 0.5;


                }else if(value == 1){

                    pos.x = 0.5;
                    pos.y = 0;
                }else if(value == 2){

                    pos.x = 1;
                    pos.y = 1;
                }
 
                else if(value == 8){

                    pos.x = 0.5;
                    pos.y = 0.8;

                }else if(value == 5 || value == 6 || value == 7){

                    pos.x = 0.5;
                    pos.y = -0.1;
                }

                nextPiece.drawImage(block, colors[value] , 0 ,16,16, x + pos.x, y + pos.y ,1,1);

            }

        });
    });


}


function collide(grid, player){

    const matriz = player.matriz;
    const offset = player.pos;


    for(let y = 0; y < matriz.length; ++y){

       for(let x = 0; x < matriz[y].length; ++x){

            if(matriz[y][x] !== 0 && (grid[y + offset.y] && grid[y + offset.y][x + offset.x]) !== 0){
                return true;
            }
 
       } 

    }

    return false;

}



function merge(grid,player){

    player.matriz.forEach((row,y) => {

            row.forEach((value, x) =>{

                if(value !== 0){
                    grid[y + player.pos.y][x + player.pos.x] = value;
                }
               

            });

    });



}





function draw(){

    ctx.fillStyle = "#F8F8F8";
    //ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawMatriz(grid,{x:0,y:0});
    drawMatriz(player.matriz,player.pos);

    drawMatrizNext(player.next,{x:1,y:1});

}




function update(time = 0){

    const deltaTime =  time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;

    if(dropCounter > dropInterval ){

        playerDrop();

    }
    fondo();
    draw();
    updateScore();
    requestAnimationFrame(update);   
}

function gridSweep(){

    let rowCount = 1;
    outer: for(let y = grid.length - 1; y > 0; --y){
        for(let x = 0; x < grid[y].length; ++x){
            if(grid[y][x] === 0){
                continue outer;
            }
            
        }

        const row = grid.splice(y,1)[0].fill(0)
        grid.unshift(row)
        ++y;
        player.score += rowCount * 10;
        player.lines++;

        rowCount *= 2;

        if(player.lines % 3 === 0) player.level++;
    }

  
}

function playerDrop(){

    player.pos.y++;
    console.log(collide(grid,player)+"<====");

    if(collide(grid,player)){
        player.pos.y--;
        merge(grid,player);
        playerReset();
        s.play("piece_landed");
    }
    gridSweep();
    dropCounter=0;

}

function playerMove(direccion){

    player.pos.x += direccion;
    if(collide(grid,player)){
        player.pos.x -= direccion;
    }

}


function playerRotate(){

    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matriz);
    while(collide(grid,player)){

        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if(offset > player.matriz[0].length){
            rotate(player.matriz);
            player.pos.x=pos;
            return;
        }

    }


}


function rotate(matriz){

    for(let y = 0; y < matriz.length; ++y){
        for(let x = 0; x < y; ++x){

            [matriz[x][y], matriz[y][x]] = [ matriz[y][x],matriz[x][y]];

        }
    }


    matriz.forEach(row => row.reverse());

}

function playerReset(){
    const pieces = 'ILJOTSZ';
    dropInterval = 1000 - (player.level*100);
    if(player.next == null){

        const indice = pieces[pieces.length * Math.random() | 0];
        player.matriz = createPiece(indice);

    }else{

        player.matriz = player.next;

    }
     
    const indice = pieces[pieces.length * Math.random() | 0];
    player.next =  createPiece(indice);

    player.pos.x = (grid[0].length / 2 | 0) -(player.matriz[0].length / 2 | 0);
    player.pos.y = 0;

    if(collide(grid,player)){


            grid.forEach(row => row.fill(0));
            player.score = 0;
            player.level = 1;
            updateScore();

    }
    

}


function updateScore(){


    document.getElementById("score").innerHTML = stringToImg(player.score);
    document.getElementById("lines").innerHTML = stringToImg(player.lines);
    document.getElementById("level").innerHTML = stringToImg(player.level);

}






document.addEventListener("keydown", e => {
    
    if(scene == 3){

        if(e.keyCode === 40){
            playerDrop();
            s.play("move_piece");
        }else if(e.keyCode === 37){
            playerMove(-1);
            s.play("move_piece");
        }else if(e.keyCode === 39){
            playerMove(1);
            s.play("move_piece");
        }else if(e.keyCode === 38){
            s.play("rotate");
            playerRotate();
        }

    }
    



});
