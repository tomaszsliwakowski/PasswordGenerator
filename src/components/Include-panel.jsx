import React from "react";
import "../styles/App.scss";

function IncludePanel({ changeState, state }) {
  return (
    <>
      <p>
        <input
          type="checkbox"
          id="One"
          name="UpperLetter"
          onChange={changeState}
          checked={state.UpperLetter}
        />
        <label htmlFor="One">Include Uppercase Letter</label>
      </p>
      <p>
        <input
          type="checkbox"
          id="Two"
          name="LowerLetter"
          onChange={changeState}
          checked={state.LowerLetter}
        />
        <label htmlFor="Two">Include Lowercase Letter</label>
      </p>
      <p>
        <input
          type="checkbox"
          id="Three"
          name="Numbers"
          onChange={changeState}
          checked={state.Numbers}
        />
        <label htmlFor="Three">Include Numers</label>
      </p>
      <p>
        <input
          type="checkbox"
          id="Four"
          name="Symbols"
          onChange={changeState}
          checked={state.Symbols}
        />
        <label htmlFor="Four">Include Symbols</label>
      </p>
    </>
  );
}

export default IncludePanel;
