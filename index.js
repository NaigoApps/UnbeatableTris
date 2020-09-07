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

function max(board) {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return {
      value: evaluate(board)
    };
  }
  let current = -1;
  let max = -1;
  for (let m = 0; m < availableMoves.length; m++) {
    const nextBoard = copyBoard(board);
    apply(nextBoard, availableMoves[m], X.value);
    const opponentMove = min(nextBoard);
    if (opponentMove.value > max) {
      max = opponentMove.value;
      current = m;
    }
  }
  return {
    move: availableMoves[current],
    value: max
  };
}

function min(board) {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return {
      value: evaluate(board)
    };
  }
  let current = -1;
  let min = +1;
  for (let m = 0; m < availableMoves.length; m++) {
    const nextBoard = copyBoard(board);
    apply(nextBoard, availableMoves[m], O.value);
    const opponentMove = max(nextBoard);
    if (opponentMove.value < min) {
      min = opponentMove.value;
      current = m;
    }
  }
  return {
    move: availableMoves[current],
    value: min
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
