import { createContext } from "react";
import { calculateWinner } from "../utils/tictactoeUtils";

const WinnerContext = createContext(false);

const WinnerProvider = ({ squares, children }) => {
  // const { winner } = calculateWinner(squares);
  // const [winner, winningCombination] = calculateWinner(squares);
  // const value = {
  //   winner: winner ? winner : null,
  //   winningCombination,
  //   squares,
  // };

  const result = calculateWinner(squares);
  const value = {
    winner: result ? result[0] : null,
    winningCombination: result ? result[1] : null,
    squares
  };

  return (
    <WinnerContext.Provider value={value}>{children}</WinnerContext.Provider>
  );
};

export { WinnerProvider, WinnerContext };
