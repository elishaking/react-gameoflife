import React from "react";
import { CELL_SIZE } from "../global/constants";

interface CellProps {
  x: number;
  y: number;
}

export default function Cell({ x, y }: CellProps) {
  return (
    <div
      className="Cell"
      style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`
      }}
    ></div>
  );
}
