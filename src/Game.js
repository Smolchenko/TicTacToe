import { useState } from "react";

import { WinnerProvider } from "./context/useWinner";
import Board from "./Board/Board";
import Moves from "./Moves";

import "./styles.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleJump = (nextMove) => {
    setCurrentMove(nextMove);
  };

  return (
    <div className="App">
      <h1>TicTacToe Game</h1>
      <WinnerProvider squares={currentSquares}>
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <Moves history={history} onGoToPreviousStep={handleJump} />
          </div>
        </div>
      </WinnerProvider>
    </div>
  );
}
