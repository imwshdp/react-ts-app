import React, { FC, useState, useRef, useEffect } from "react";
import Colors from "Components/Chess/Models/Colors";
import Player from "Components/Chess/Models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  
  const [blackTime, setBlackTime] = useState(600);
  const [whiteTime, setWhiteTime] = useState(600);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    // stopping timer for player
    if (timer.current) {
      clearInterval(timer.current);
    }

    // picking current timer
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;

    // start new timer
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  };

  return (
    <div className="timer">
      <button className="newGame" onClick={handleRestart}>
        Новая игра
      </button>
      <h2>Черные: {blackTime}</h2>
      <h2>Белые: {whiteTime}</h2>
    </div>
  );
};

export default Timer;
