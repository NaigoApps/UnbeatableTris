const EMPTY = {
  value: 0,
  css: "",
};
const X = {
  value: 1,
  css: "X",
  score = +1
};
const O = {
  value: 2,
  css: "O",
  score = -1
};

const board = [
  [EMPTY.value, EMPTY.value, EMPTY.value],
  [EMPTY.value, EMPTY.value, EMPTY.value],
  [EMPTY.value, EMPTY.value, EMPTY.value]
];

function init() {
  for (let i = 0; i < 9; i += 1) {
    $("#" + i).click(() => putX(i));
  }
}

function putX(id) {
  const row = Math.floor(id / board.length);
  const col = Math.floor(id % board[row].length);
  board[row][col] = 1;

  cpu();

  draw();
}

function cpu() {
  //Calcolo "intelligente"
  //board[?][?] = 2;
}

function draw() {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const id = (r * board.length + c).toString();
      const component = $("#" + id);
      component.removeClass(X.css);
      component.removeClass(O.css);
      if (board[r][c] === 1) {
        component.addClass(X.css);
      } else if (board[r][c] === 2) {
        component.addClass(O.css);
      }
    }
  }
}

function minMax(symbol) {
  const availableMoves = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === EMPTY.value) {
        availableMoves.push({
          row: r,
          column: c,
        });
      }
    }
  }
  let current = -1;
  let max = -1;
  for(let m = 0;m < availableMoves.length;m++){
    
  }

  for (let i = 0; i < moves.size(); i++) {
    eaterCell = config[(moves[i].startId & ROW) / 8][moves[i].startId & COLUMN];
    //Cancello le pedine mangiate
    config[(moves[i].startId & ROW) / 8][moves[i].startId & COLUMN] =
      NORMAL | NOBODY;

    res = minMax(config, level - 1, moves[i], !max);
    if (max && res.value > best.value) {
      best = moves[i];
      best.value = res.value;
    }
    if (!max && res.value < best.value) {
      best = moves[i];
      best.value = res.value;
    }
  }
  if (moves.size() == 0) {
    arrived.value = max ? -1000 : 1000;
    return arrived;
  }

  return best;
}

function isFull() {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        return false;
      }
    }
  }
  return true;
}
