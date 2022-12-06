import React, { FC, useState, useEffect } from "react";
import "../../Styles/Chess.css";
import CellComponent from "./CellComponent";
import { Board } from "./Models/Board";
import { Cell } from "./Models/Cell";
import { Colors } from "./Models/Colors";
import { Player } from "./Models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function click(cell: Cell) {
    // MOVING TO CELL
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);

      // swap player
      swapPlayer();

      // PICKING CELL
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        // if cell contains figure - change state and select this cell
        setSelectedCell(cell);
      }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  // function endGame() {
  //   console.log("game ended");
  // }

  return (
    <>
      <h3>
        Сейчас ходит{" "}
        {currentPlayer?.color === Colors.WHITE ? "белый" : "чёрный"} игрок
      </h3>
      <div className="board">
        {board.cells.map((row, index) => (
          // row
          <React.Fragment key={index}>
            {/* cell */}
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    ? true
                    : false
                }
                click={click}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BoardComponent;
