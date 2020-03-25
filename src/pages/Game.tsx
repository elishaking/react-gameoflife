import React, { Component } from "react";
import "./Game.scss";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

export default class Game extends Component {
  render() {
    return (
      <div className="Board" style={{ width: WIDTH, height: HEIGHT }}>
        <h1>Game</h1>
      </div>
    );
  }
}
