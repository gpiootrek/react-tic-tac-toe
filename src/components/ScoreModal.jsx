import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="overlay">
      <div className={`modal ${props.modifiers}`}>{props.children}</div>
    </div>
  );
};
// TODO buttons and closing logic
const ScoreModal = ({ winner, onClose }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay modifiers="modal__score">
          <h2 className="modal__winner-info">
            {winner === "x" ? "YOU WON!" : winner === "o" ? "CPU WON!" : "TIE!"}
          </h2>
          <h1 className={`modal__winner modal__winner--${winner}`}>
            {winner === "x" ? (
              <ImCross
                className={`modal__winner-icon modal__winner-icon--${winner}`}
              />
            ) : (
              <FaDotCircle
                className={`modal__winner-icon modal__winner-icon--${winner}`}
              />
            )}
            Takes the round
          </h1>
          <div className="modal__buttons-container">
            <button className="modal__button modal__button--quit">Quit</button>
            <button className="modal__button modal__button--next">
              Next Round
            </button>
          </div>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ScoreModal;
