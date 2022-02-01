import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";

const Field = ({ rowIndex, colIndex, turn, handleMove, classes }) => {
  const [icon, setIcon] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFieldClick = () => {
    handleMove({ rowIndex, colIndex });
    setIcon(
      turn ? (
        <ImCross className="board__icon board__icon--cross" />
      ) : (
        <FaDotCircle className="board__icon board__icon--circle" />
      )
    );

    setIsDisabled(true);
  };

  return (
    <button
      onClick={handleFieldClick}
      disabled={isDisabled}
      className={classes}
    >
      {icon}
    </button>
  );
};

export default Field;
