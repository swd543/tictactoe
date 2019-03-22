import React, { FunctionComponent } from "react";
import "./Tic.css";

interface IProps {
  value: boolean | null;
  clickHandler?: () => void;
}

const Tic: FunctionComponent<IProps> = props => {
  const { value, clickHandler } = props;
  return (
    <div className="Tic" onClick={clickHandler}>
      {value === true && <h1>X</h1>}
      {value === false && <h1>O</h1>}
    </div>
  );
};

export default Tic;
