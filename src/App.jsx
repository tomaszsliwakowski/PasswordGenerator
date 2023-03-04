import React, { useEffect, useState, useRef } from "react";
import "./styles/App.scss";
import { FiRefreshCw, FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
function App() {
  const characters = {
    numbers: "0123456789",
    upperCaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCaseLetters: "abcdefghijklmnopqrstuvwxyz",
    specialCharacters: "!'^+%&/()=?_#${[]}|;:>÷`<.*-@é",
  };
  const [password, setPassword] = useState("");
  const [refreshAnim, setrefreshAnim] = useState(false);
  const [copyAnim, setcopyAnim] = useState(false);
  const [state, setstate] = useState({
    LowerLetter: true,
    UpperLetter: true,
    Numbers: true,
    Symbols: true,
    range: 12,
  });
  const [strenghtState, setstrenghtState] = useState({
    low: false,
    medium: false,
    high: true,
  });
  const changeState = (e) => {
    if (e.target.type === "range") {
      setstate((prev) => ({
        ...prev,
        range: e.target.value,
      }));
    } else {
      setstate((prev) => {
        if (
          Object.values(prev).filter((item) => item === true).length === 1 &&
          e.target.checked === false
        ) {
          return prev;
        } else {
          return {
            ...prev,
            [e.target.name]: e.target.checked,
          };
        }
      });
    }
  };
  const GeneratePassword = () => {
    animateRefresh();
    let characterList = "";
    if (state.LowerLetter) {
      characterList += characters.lowerCaseLetters;
    }
    if (state.UpperLetter) {
      characterList += characters.upperCaseLetters;
    }
    if (state.Numbers) {
      characterList += characters.numbers;
    }
    if (state.Symbols) {
      characterList += characters.specialCharacters;
    }
    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < state.range; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const SetPasswordStrenght = () => {
    if (state.range < 7) {
      setstrenghtState({
        low: true,
        medium: false,
        high: false,
      });
    } else if (state.range >= 7 && state.range < 12) {
      setstrenghtState({
        low: false,
        medium: true,
        high: false,
      });
    } else {
      setstrenghtState({
        low: false,
        medium: false,
        high: true,
      });
    }
  };

  const animateRefresh = () => {
    setrefreshAnim(true);
    setTimeout(() => setrefreshAnim(false), 300);
  };
  const animateCopy = () => {
    setcopyAnim(true);
    setTimeout(() => setcopyAnim(false), 1000);
  };

  useEffect(() => {
    GeneratePassword();
    SetPasswordStrenght();
  }, []);

  useEffect(() => {
    SetPasswordStrenght();
  }, [password]);

  return (
    <div className="App">
      <div className="App__container">
        <h1>Password Generator</h1>
        <div className="App__container__lenght">
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
        </div>
        <div className="App__container__include">
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
        </div>
        <div className="App__container__strenght">
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
        </div>
        <div className="App__container__password">
          <span>
            <p>{password}</p>
            <FiRefreshCw
              onClick={GeneratePassword}
              className={refreshAnim ? "refresh" : null}
            />
          </span>
          <CopyToClipboard text={password}>
            <button onClick={animateCopy} className={copyAnim ? "copy" : null}>
              <FiCopy />
              Copy Password
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default App;
