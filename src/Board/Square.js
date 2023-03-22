import { useContext } from "react";
import { WinnerContext } from "../context/useWinner";
import "./Board.css";

const Square = ({ value, onSquareClick, causedWin }) => {
  const { winner, winningCombination, squares } = useContext(WinnerContext);
  const notAvailable = value || winner;

  return (
    <div
      className={`
        square 
        ${notAvailable ? "not-available" : ""}
        ${causedWin ? "highlight-winner" : ""}
      `}
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
};

export default Square;

//     ${causedWin ? "highlight-winner" : ""}
