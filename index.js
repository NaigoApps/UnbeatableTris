const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function init(){
    document.getElementById("0").onclick = () => putX(0);
    document.getElementById("1").onclick = () => putX(1);
    document.getElementById("2").onclick = () => putX(2);
    document.getElementById("3").onclick = () => putX(3);
    document.getElementById("4").onclick = () => putX(4);
    document.getElementById("5").onclick = () => putX(5);
    document.getElementById("6").onclick = () => putX(6);
    document.getElementById("7").onclick = () => putX(7);
    document.getElementById("8").onclick = () => putX(8);
}

function putX(id){
    const row = Math.floor(id / board.length);
    const col = Math.floor(id % board[row].length);
    board[row][col] = 1;

    cpu();

    draw();
}

function cpu(){
    //Calcolo "intelligente"

    //board[?][?] = 2;
}

function draw(){
    for(let r = 0;r < board.length;r++){
        for(let c = 0;c < board[r].length;c++){
            const id = (r * board.length + c).toString();
            if(board[r][c] === 1){
                document.getElementById(id).classList = "box X"
            }else if(board[r][c] === 2){
                document.getElementById(id).classList = "box O"
            }else {
                document.getElementById(id).classList = "box"
            }
        }
    }
}

function minMax(max){

        if(isFull()){
            //TODO
        }

        for(let r = 0;r < board.length;r++){
            for(let c = 0;c < board[r].length;c++){
                if(board[r][c] === 0){
                    
                }
            }
        }


        for(int i = 0;i < moves.size();i++){
            eaterCell = config[(moves[i].startId & ROW) / 8][moves[i].startId & COLUMN];
            //Cancello le pedine mangiate
            config[(moves[i].startId & ROW) / 8][moves[i].startId & COLUMN] = NORMAL | NOBODY;
    
            res = minMax(config,level-1,moves[i],!max);
            if(max && res.value > best.value){
                best = moves[i];
                best.value = res.value;
            }
            if(!max && res.value < best.value){
                best = moves[i];
                best.value = res.value;
            }
        }
        if(moves.size() == 0){
            arrived.value = (max)?-1000:1000;
            return arrived;
        }
    
        return best;
    }



}

function isFull(){
    for(let r = 0;r < board.length;r++){
        for(let c = 0;c < board[r].length;c++){
            if(board[r][c] === 0){
                return false;
            }
        }
    }
    return true;
}