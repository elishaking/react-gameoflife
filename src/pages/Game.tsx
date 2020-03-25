import React, { Component } from "react";
import "./Game.scss";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

interface Cell {
  x: number;
  y: number;
}

export default class Game extends Component {
  rows: number;
  cols: number;
  board: boolean[][];

  state = {
    cells: []
  };

  constructor(props: {}) {
    super(props);

    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
  }

  // Create an empty board
  makeEmptyBoard = () => {
    const board: boolean[][] = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  };

  // Create cells from this.board
  makeCells = () => {
    const cells: Cell[] = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  };

  render() {
    return (
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
        }}
      >
        <h1>Game</h1>
      </div>
    );
  }
}
