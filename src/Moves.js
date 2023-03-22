import { useState, useMemo, useCallback } from "react";
import { findDifference } from "./utils/tictactoeUtils";

const Moves = ({ history, onGoToPreviousStep }) => {
  const [isAscending, setIsAscending] = useState(true);
  const handleSort = () => setIsAscending(!isAscending);

  // improvement below -
  const nullCount = useMemo(() => {
    return history[history.length - 1].reduce(
      (count, square) => count + (square === null ? 1 : 0),
      0
    );
  }, [history.length]);
  // }, [history]); //maybe history.length?

  //improvement below -
  const formatLastMove = useMemo(() => {
    return (differenceIndex) => {
      return `(col${(differenceIndex % 3) + 1}, row${(
        Math.floor(differenceIndex / 3) + 1
      ).toFixed()})`;
    };
  }, []); // why an empty dependency array?

  // const formattedLastMove = useMemo(() => {
  //   return formatLastMove(differenceIndex);
  // }, [differenceIndex]); // not sure how to use it

  // 2 suggested new improvement below
  // 1
  // sortedHistory gave a bug - upon reversing, the rows didn't stick to their correct value.
  // const sortedHistory = useMemo(() => {
  //   return isAscending ? history : [...history].reverse();
  // }, [history, isAscending]);
  // 2
  const memoizedFindDifference = useCallback((prevSquares, nextSquares) => {
    return findDifference(prevSquares, nextSquares);
  }, []);

  return (
    <>
      <div>
        {nullCount !== 9 && (
          <button className="sort" onClick={handleSort}>
            {!isAscending ? "Asc" : "Desc"}
          </button>
        )}
      </div>

      <ul className={isAscending ? "asc" : "desc"}>
        {history.map((squares, iMove) => {
          // !!! {sortedHistory.map((squares, iMove) => {
          const isFirstButton = iMove === 0;
          // let description, differenceIndex, formattedLastMove;
          let description, differenceIndex;

          if (!isFirstButton && iMove === history.length - 1) {
            differenceIndex = memoizedFindDifference(
              history[history.length - 2],
              squares
            );
            // differenceIndex = findDifference(
            //   history[history.length - 2],
            //   squares
            // );
            // formattedLastMove = formatLastMove(differenceIndex);
            // description = `You are at move #${iMove} index: ${differenceIndex} ${formattedLastMove}`;
            // description = `You are at move #${iMove} ${formattedLastMove}`;
            description = `You are at move #${iMove} ${formatLastMove(
              differenceIndex
            )}`;
          } else if (iMove > 0) {
            differenceIndex = memoizedFindDifference(
              history[iMove - 1],
              history[iMove]
            );
            // differenceIndex = findDifference(
            //   history[iMove - 1],
            //   history[iMove]
            // );
            // formattedLastMove = formatLastMove(differenceIndex);
            // description = `Go to move #${iMove} index: ${differenceIndex} ${formattedLastMove}`;
            // description = `Go to move #${iMove} ${formattedLastMove}`;
            description = `Go to move #${iMove} ${formatLastMove(
              differenceIndex
            )}`;
          } else {
            description = `Go to game start`;
          }

          return (
            <li key={iMove}>
              <button
                className={isFirstButton ? "reset" : ""}
                onClick={() => onGoToPreviousStep(iMove)}
                disabled={isFirstButton && nullCount === 9}
              >
                {description}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Moves;

// import { useState, useEffect } from "react";
// import { findDifference } from "./utils/tictactoeUtils";

// const Moves = ({ history, onGoToPreviousStep }) => {
//   const [isAscending, setIsAscending] = useState(true);
//   const handleSort = () => setIsAscending(!isAscending);

//   let nullCount = history[history.length - 1].reduce((count, square) => {
//     return count + (square === null ? 1 : 0);
//   }, 0);

//   const formatLastMove = (differenceIndex) => {
//     return `(c${(differenceIndex % 3) + 1}, r${(
//       Math.floor(differenceIndex / 3) + 1
//     ).toFixed()})`;
//   };

//   return (
//     <>
//       {nullCount !== 9 ? (
//         <div>
//           <button className="sort" onClick={handleSort}>
//             {!isAscending ? "Asc" : "Desc"}
//           </button>
//         </div>
//       ) : (
//         <div></div>
//       )}

//       <ul className={isAscending ? "asc" : "desc"}>
//         {history.map((squares, iMove) => {
//           const isFirstButton = iMove === 0;
//           let description, differenceIndex, formattedLastMove;

//           if (!isFirstButton && iMove === history.length - 1) {
//             differenceIndex = findDifference(
//               history[history.length - 2],
//               squares
//             );
//             formattedLastMove = formatLastMove(differenceIndex);
//             description = `You are at move #${iMove} index: ${differenceIndex} ${formattedLastMove}`;
//           } else if (iMove > 0) {
//             differenceIndex = findDifference(
//               history[iMove - 1],
//               history[iMove]
//             );
//             formattedLastMove = formatLastMove(differenceIndex);
//             description = `Go to move #${iMove} index: ${differenceIndex} ${formattedLastMove}`;
//           } else {
//             description = `Go to game start`;
//           }

//           return (
//             <li key={iMove}>
//               <button
//                 className={isFirstButton ? "reset" : ""}
//                 onClick={() => onGoToPreviousStep(iMove)}
//                 disabled={isFirstButton && nullCount === 9}
//               >
//                 {description}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// export default Moves;
