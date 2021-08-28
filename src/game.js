export class Game {
  #board;
  #players;
  #currentPlayerIndex;
  #size;

  static getRandomNum() {
    return Math.floor(Math.random() * 2);
  }

  constructor(size) {
    this.#size = size;
    this.#board = new Array(size).fill(0).map(() => new Array(size).fill(""));
    this.#players = ["O", "X"];
    this.#currentPlayerIndex = Game.getRandomNum();
  }

  get board() {
    return this.#board;
  }

  get players() {
    return this.#players;
  }

  get currentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  nextTurn() {
    const len = this.#players.length;
    this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % len;
  }

  move({ row, col }) {
    this.#board[row][col] = this.currentPlayer;
    let result = this.checkWinner();
    this.nextTurn();
    return result;
  }

  checkWinner() {
    const size = this.#board.length;
    // horizontal check
    for (let i = 0; i < size; i++) {
      for (let j = 1; j < size; j++) {
        if (this.#board[i][j] !== "") {
          if (this.#board[i][j] !== this.#board[i][0]) {
            break;
          }
          if (j === size - 1) {
            return this.#board[i][j];
          }
        }
      }
    }
    // vertical check
    for (let j = 0; j < size; j++) {
      for (let i = 1; i < size; i++) {
        if (this.#board[i][j] !== "") {
          if (this.#board[i][j] !== this.#board[0][j]) {
            break;
          }
          if (i === size - 1) {
            return this.#board[i][j];
          }
        }
      }
    }
    // diagonal check
    for (let i = 1; i < size; i++) {
      if (this.#board[i][i] !== "") {
        if (this.#board[i][i] !== this.#board[0][0]) {
          break;
        }
        if (i === size - 1) {
          return this.#board[i][i];
        }
      }
    }

    for (let i = 1; i < size; i++) {
      if (this.#board[i][size - 1 - i] !== "") {
        if (this.#board[i][i] !== this.#board[0][2]) {
          break;
        }
        if (i === size - 1) {
          return this.#board[i][i];
        }
      }
    }
    // check tie
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.#board[i][j] === "") {
          return;
        }
      }
    }
    return "tie";
  }

  reset() {
    this.#board = new Array(this.#size)
      .fill(0)
      .map(() => new Array(this.#size).fill(""));
  }
}
