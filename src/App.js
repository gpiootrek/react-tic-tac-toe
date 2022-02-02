import React, { useEffect, useReducer, useState } from "react";
import { ImCross, ImSpinner11 } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Field from "./components/Field";
import BoardInfo from "./components/BoardInfo";
import ScoreModal from "./components/ScoreModal";

const WINNING_COMBINATIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function reducer(state, action) {
  switch (action.type) {
    case "move":
      let newScore = [...state.scoreBoard];
      const nextTurn = !state.turn;
      newScore[action.row][action.col] = state.turn ? "x" : "o";
      return {
        scoreBoard: newScore,
        turn: nextTurn,
        moves: state.moves + 1,
        isFinished: false,
      };
    case "check":
      let winner;
      if (state.moves >= 5) {
        for (let c in WINNING_COMBINATIOS) {
          const [c0, c1, c2] = WINNING_COMBINATIOS[c];
          const arrayToCheck = state.scoreBoard.reduce((prev, cur) => {
            return prev.concat(cur);
          });
          if (
            arrayToCheck[c0] === arrayToCheck[c1] &&
            arrayToCheck[c1] === arrayToCheck[c2]
          ) {
            winner = arrayToCheck[c0];
          }
        }
      }
      if (winner) {
        // TODO there is a winner and game is finished
        const finished = true;
        return { ...state, isFinished: finished, winner };
      }
      return { ...state };
    case "reset":
      return {
        scoreBoard: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        turn: true,
        moves: 0,
        isFinished: false,
      };
    case "close":
      // TODO on closing modal after finished game
      return { ...state, isFinished: false };
    default:
      throw new Error();
  }
}

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameState, dispatchGameState] = useReducer(reducer, {
    scoreBoard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: true,
    moves: 0,
    isFinished: false,
  });

  const handleMove = ({ rowIndex, colIndex }) => {
    dispatchGameState({
      type: "move",
      row: rowIndex,
      col: colIndex,
    });
    dispatchGameState({
      type: "check",
    });
  };

  // TODO reset
  const handleGameReset = () => {
    dispatchGameState({
      type: "reset",
    });
  };

  useEffect(() => {
    if (gameState.scoreBoard.join("").length <= 6) {
      setBoard([...gameState.scoreBoard]);
    }
  }, [gameState.scoreBoard]);

  return (
    <div className="board">
      {gameState.isFinished && (
        <ScoreModal
          winner={gameState.winner}
          onClose={() =>
            dispatchGameState({
              type: "close",
            })
          }
        />
      )}
      <BoardInfo modifiers="board__info--top">
        <div>
          <ImCross className="board__info__icon board__icon--cross" />
          <FaDotCircle className="board__info__icon board__icon--circle" />
        </div>
        <div className="board__turn">
          {gameState.turn ? (
            <ImCross className="board__icon--cross" />
          ) : (
            <FaDotCircle className="board__icon--circle" />
          )}{" "}
          Turn
        </div>
        <button
          className="board__button"
          id="reset-button"
          onClick={handleGameReset}
        >
          <ImSpinner11 className="" />
        </button>
      </BoardInfo>
      {board.map((rows, rowIndex) => {
        return rows.map((field, colIndex) => (
          <Field
            key={colIndex}
            rowIndex={rowIndex}
            colIndex={colIndex}
            turn={gameState.turn ? 1 : 0}
            handleMove={handleMove}
            classes={`board__field`}
          />
        ));
      })}
      <BoardInfo modifiers="board__info--bottom">
        <div className="board__score board__score--player-1">
          <span className="board__score__info">X (YOU)</span>
          <span className="board__score__text">0</span>
        </div>
        <div className="board__score board__score--ties">
          <span className="board__score__info">TIES</span>
          <span className="board__score__text">0</span>
        </div>
        <div className="board__score board__score--player-2">
          <span className="board__score__info">O (CPU)</span>
          <span className="board__score__text">0</span>
        </div>
      </BoardInfo>
    </div>
  );
};

export default App;
