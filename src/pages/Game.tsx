import React, { Component } from "react";
import "./Game.scss";
import { HEIGHT, CELL_SIZE, WIDTH } from "../global/constants";
import Cell from "../components/Cell";

interface Cell {
  x: number;
  y: number;
}

interface GameState {
  cells: any[];
  interval: number;
  isRunning: boolean;
}

export default class Game extends Component {
  rows: number;
  cols: number;
  board: boolean[][];
  boardRef: HTMLDivElement | any;
  intervalHandle: number | null = null;

  state: GameState = {
    cells: [],
    interval: 100,
    isRunning: false
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

  iteration = () => {
    console.log("running iteration...");
    let newBoard = this.makeEmptyBoard();
    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
  };

  runIteration() {
    // this.intervalHandle = window.setTimeout(() => {
    //   this.runIteration();
    // }, this.state.interval);

    this.intervalHandle = window.setInterval(
      this.iteration,
      this.state.interval
    );
  }

  runGame = () => {
    this.setState({ isRunning: true });

    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });

    if (this.intervalHandle) {
      window.clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  };

  /**
   * Calculate the number of neighbors at point (x, y)
   * @param {boolean[][]} board
   * @param {number} x
   * @param {number} y
   */
  calculateNeighbors(board: boolean[][], x: number, y: number) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }

  handleIntervalChange = (event: any) => {
    this.setState({ interval: event.target.value });
  };

  render() {
    const { cells, isRunning } = this.state;

    return (
      <div>
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
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>

        <div className="controls">
          <label htmlFor="interval">Update every:</label>
          <input
            name="interval"
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />
          msec
          {isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}
        </div>
      </div>
    );
  }
}
