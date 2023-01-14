import React, { useEffect, useState } from "react";

import "Styles/Chess.css";
import Colors from "Components/Chess/Models/Colors";
import BoardComponent from "Components/Chess/BoardComponent";
import LostFigures from "Components/Chess/LostFigures";
import Board from "Components/Chess/Models/Board";
import Player from "Components/Chess/Models/Player";
import Timer from "Components/Chess/Timer";

const ChessPage = () => {

  // game board state
  const [board, setBoard] = useState(new Board());

  // players state
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="page">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <div>
        <h3>Съеденные фигуры</h3>
        <div className="lost-figures">
          <LostFigures title={"Черные"} figures={board.lostBlackFigures} />
          <LostFigures title={"Белые"} figures={board.lostWhiteFigures} />
        </div>
      </div>
    </div>
  );
};

export default ChessPage;
