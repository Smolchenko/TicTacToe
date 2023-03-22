import { useContext } from "react";
import { WinnerContext } from "../context/useWinner";
import Square from "./Square";
import "./Board.css";

const Board = ({ xIsNext, onPlay }) => {
  const { winner, winningCombination, squares } = useContext(WinnerContext);

  let status;
  if (winner) {
    status = `The winner is ${winner}`;
  } else if (squares.includes(null)) {
    status = `Next player is ${xIsNext ? "X" : "O"}`;
  } else {
    status = "Tie! Game is Over";
  }

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    else {
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? "X" : "O";
      onPlay(nextSquares);
    }
  };

  return (
    <>
      <div className="board">
        <div className="status">{status}</div>
        {Array.from({ length: 3 }, (_, i) => (
          <div className="board-row" key={i}>
            {Array.from({ length: 3 }, (_, j) => (
              <Square
                key={j}
                value={squares[i * 3 + j]}
                onSquareClick={() => handleClick(i * 3 + j)}
                causedWin={winningCombination?.includes(i * 3 + j)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
