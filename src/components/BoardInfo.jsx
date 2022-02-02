import React from 'react';

const BoardInfo = (props) => {
  return <div className={`board__info ${props.modifiers}`}>
      {props.children}
  </div>;
};

export default BoardInfo;
