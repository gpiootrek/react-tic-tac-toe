import React, { useEffect, useReducer, useState } from "react";
import { ImCross, ImSpinner11 } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Field from "./components/Field";

// TODO changing player after turn
// FIX fields rendering

function reducer(state, action) {
  switch (action.type) {
    case "move":
      let newScore = [...state.scoreBoard];
      const nextTurn = !state.turn;
      newScore[action.row][action.col] = state.turn ? 'x' : 'o';
      return { scoreBoard: newScore, turn: nextTurn };
    case "reset":
      return {
        scoreBoard: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        turn: true,
      };
    default:
      throw new Error();
  }
}

const App = () => {
  const [board, setBoard] = useState(null);
  const [gameState, dispatchGameState] = useReducer(reducer, {
    scoreBoard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: true,
  });

  const handleMove = ({ row, col }) => {
    dispatchGameState({
      type: "move",
      row,
      col,
    });
  };

  const handleGameReset = () => {
    dispatchGameState({
      type: "reset",
    });
  };

  const renderBoard = () => {
    const newBoard = [];
    for (let i = 0; i < 9; i++) {
      newBoard.push(
        <Field
          key={i}
          index={i}
          turn={gameState.turn ? 1 : 0}
          handleMove={handleMove}
          classes={`board__field`}
        />
      );
    }
    return newBoard;
  };

  useEffect(() => {
    setBoard(renderBoard());
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <div className="board">
      <div className="board__info">
        <div>
          <ImCross className="board__icon board__icon--cross" />
          <FaDotCircle className="board__icon board__icon--circle" />
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
      </div>
      {board}
    </div>
  );
};

export default App;
