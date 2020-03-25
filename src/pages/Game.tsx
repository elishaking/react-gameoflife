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
  boardRef: HTMLDivElement | any;

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

  getElementOffset = () => {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop
    };
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.makeCells() });
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
        onClick={this.handleClick}
        ref={n => {
          this.boardRef = n;
        }}
      >
        <h1>Game</h1>
      </div>
    );
  }
}
