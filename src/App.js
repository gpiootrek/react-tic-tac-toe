import React, { useState } from "react";
import { ImCross, ImSpinner11 } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Field from "./components/Field";

const App = () => {
  const [turn, setTurn] = useState(true);
  const board = [];
  const [score, setScore] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const handleMove = ({ row, col }) => {
    setTurn((prev) => (prev = !prev));
    setScore((score[row][col] = turn ? "x" : "o"));
    console.log(score);
  };

  const showBoard = () => {
    console.log(score);
  };

  for (let i = 0; i < 9; i++) {
    board.push(
      <Field
        index={i}
        key={i}
        turn={turn ? 1 : 0}
        handleMove={handleMove}
        classes={`board__field`}
      />
    );
  }

  return (
    <div className="board">
      <div className="board__info">
        <div>
          <ImCross className="board__icon board__icon--cross" />
          <FaDotCircle className="board__icon board__icon--circle" />
        </div>
        <div className="board__turn" onClick={showBoard}>
          {turn ? (
            <ImCross className="board__icon--cross" />
          ) : (
            <FaDotCircle className="board__icon--circle" />
          )}{" "}
          Turn
        </div>
        <button className="board__button">
          <ImSpinner11 className="" />
        </button>
      </div>
      {board}
    </div>
  );
};

export default App;
