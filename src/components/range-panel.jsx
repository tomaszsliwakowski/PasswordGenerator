import React from "react";
import "../styles/App.scss";

function RangePanel({ changeState, state }) {
  return (
    <>
      <span>
        <p>Character Lenght</p>
        <p>{state.range}</p>
      </span>
      <input
        type="range"
        name="range"
        min="0"
        max="50"
        onChange={changeState}
        value={state.range}
      />
    </>
  );
}

export default RangePanel;
