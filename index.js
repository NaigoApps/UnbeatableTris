const EMPTY = {
  value: 0,
  css: "",
};
const X = {
  value: 1,
  css: "X"
};
const O = {
  value: -1,
  css: "O"
};

const EMOTICONS = {
  SAD: 0,
  NORMAL: 1,
  HAPPY: 2,
  DEVIL: 3
};

let emoticon = EMOTICONS.NORMAL;

const winCoords = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
]

const gameBoard = makeBoard();

function makeBoard() {
  return [
    [EMPTY.value, EMPTY.value, EMPTY.value],
    [EMPTY.value, EMPTY.value, EMPTY.value],
    [EMPTY.value, EMPTY.value, EMPTY.value]
  ];
}

function copyBoard(board) {
  return [[...board[0]], [...board[1]], [...board[2]]];
}

function init() {
  for (let i = 0; i < 9; i += 1) {
    $("#" + i).on('click', () => putX(i));
  }
}

function putX(id) {
  const row = Math.floor(id / gameBoard.length);
  const col = Math.floor(id % gameBoard[row].length);
  gameBoard[row][col] = 1;

  cpu();

  draw();
}

function cpu() {
  const opponentMove = min(gameBoard);
  if (opponentMove.move) {
    apply(gameBoard, opponentMove.move, O.value);
  }
  if(opponentMove.stat.O > 0){
    emoticon = EMOTICONS.NORMAL;
  }
  if(opponentMove.stat.O < opponentMove.stat.X){
    emoticon = EMOTICONS.SAD;
  }
  if(opponentMove.stat.O > opponentMove.stat.X){
    emoticon = EMOTICONS.HAPPY;
  }
  if(opponentMove.stat.O > 0 && opponentMove.stat.X === 0){
    emoticon = EMOTICONS.DEVIL;
  }
  console.log(opponentMove.stat)
}

function showEmoticon() {
  const $sad = $("#sad");
  $sad.removeClass('active');
  const $normal = $("#normal");
  $normal.removeClass('active');
  const $happy = $("#happy");
  $happy.removeClass('active');
  const $devil = $("#devil");
  $devil.removeClass('active');
  if (emoticon === EMOTICONS.SAD) {
    $sad.addClass('active');
  } else if (emoticon === EMOTICONS.NORMAL) {
    $normal.addClass('active');
  } else if (emoticon === EMOTICONS.HAPPY) {
    $happy.addClass('active');
  } else if (emoticon === EMOTICONS.DEVIL) {
    $devil.addClass('active');
  }
}

function draw() {
  for (let r = 0; r < gameBoard.length; r++) {
    for (let c = 0; c < gameBoard[r].length; c++) {
      const id = (r * gameBoard.length + c).toString();
      const component = $("#" + id);
      component.removeClass(X.css);
      component.removeClass(O.css);
      if (gameBoard[r][c] === X.value) {
        component.addClass(X.css);
      } else if (gameBoard[r][c] === O.value) {
        component.addClass(O.css);
      }
    }
  }
  showEmoticon();
}

function getAvailableMoves(board) {
  if (evaluate(board) !== 0) {
    return [];
  }
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
  return availableMoves;
}

function evaluation(board) {
  const value = evaluate(board);
  return {
    value: value,
    stat: {
      X: value === 1 ? 1 : 0,
      O: value === -1 ? 1 : 0
    }
  };
}

function max(board) {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return evaluation(board);
  }
  let current = -1;
  let max = -1;
  let stat = {
    X: 0, O: 0
  };
  for (let m = 0; m < availableMoves.length; m++) {
    const nextBoard = copyBoard(board);
    apply(nextBoard, availableMoves[m], X.value);
    const opponentMove = min(nextBoard);
    if (opponentMove.value >= max) {
      max = opponentMove.value;
      current = m;
    }
  }
  if(max > 0){
    stat.X = 1;
  }else if(max < 0){
    stat.O = 1;
  }
  return {
    move: availableMoves[current],
    value: max,
    stat: stat
  };
}

function min(board) {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return evaluation(board);
  }
  let current = -1;
  let min = +1;
  let stat = {
    X: 0, O: 0, EMPTY: 0
  };
  for (let m = 0; m < availableMoves.length; m++) {
    const nextBoard = copyBoard(board);
    apply(nextBoard, availableMoves[m], O.value);
    const opponentMove = max(nextBoard);
    if (opponentMove.value <= min) {
      min = opponentMove.value;
      current = m;
    }
  }
  if(min > 0){
    stat.X = 1;
  }else if(min < 0){
    stat.O = 1;
  }
  return {
    move: availableMoves[current],
    value: min,
    stat: stat
  };
}

function evaluate(board) {
  for (let winCoord of winCoords) {
    if (board[winCoord[0][0]][winCoord[0][1]] === X.value &&
        board[winCoord[1][0]][winCoord[1][1]] === X.value &&
        board[winCoord[2][0]][winCoord[2][1]] === X.value) {
      return X.value
    }
    if (board[winCoord[0][0]][winCoord[0][1]] === O.value &&
        board[winCoord[1][0]][winCoord[1][1]] === O.value &&
        board[winCoord[2][0]][winCoord[2][1]] === O.value) {
      return O.value
    }
  }
  return EMPTY.value;
}

function apply(board, move, value) {
  board[move.row][move.column] = value;
}
