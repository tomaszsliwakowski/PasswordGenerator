import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { FiRefreshCw, FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IncludePanel from "./components/Include-panel";
import RangePanel from "./components/range-panel";
import StrenghtPanel from "./components/strenght-panel";
import { characters } from "./characters";
function App() {
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
          <RangePanel changeState={changeState} state={state} />
        </div>
        <div className="App__container__include">
          <IncludePanel changeState={changeState} state={state} />
        </div>
        <div className="App__container__strenght">
          <StrenghtPanel strenghtState={strenghtState} />
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
