import React from "react";
import "../styles/App.scss";

function StrenghtPanel({ strenghtState }) {
  return (
    <>
      <span>
        <p>Strenght</p>
        <p>
          {strenghtState.low
            ? "Password low strengh"
            : strenghtState.medium
            ? "Password medium strengh"
            : strenghtState.high
            ? "Password high strengh"
            : null}
        </p>
      </span>
      <div className="App__container__strenght--show">
        <span
          style={
            strenghtState.low
              ? { backgroundColor: "red" }
              : strenghtState.medium
              ? { backgroundColor: "orange" }
              : strenghtState.high
              ? { backgroundColor: "green" }
              : { backgroundColor: "#aaa" }
          }
        ></span>
        <span
          style={
            strenghtState.medium
              ? { backgroundColor: "orange" }
              : strenghtState.high
              ? { backgroundColor: "green" }
              : { backgroundColor: "#aaa" }
          }
        ></span>
        <span
          style={
            strenghtState.high
              ? { backgroundColor: "green" }
              : { backgroundColor: "#aaa" }
          }
        ></span>
      </div>
    </>
  );
}

export default StrenghtPanel;
