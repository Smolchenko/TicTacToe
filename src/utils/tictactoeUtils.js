const calculateWinner = (squares) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // const winner = squares[a];
      // const winningCombination = winningCombos[i];
      // return [winner, winningCombination];
      return [squares[a], winningCombos[i]];
    }
  }
};

const findDifference = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return i;
    }
  }
  return -1; // return -1 if arrays are identical
};
export { calculateWinner, findDifference };
