import React from 'react';
import "./styles/App.scss"

function App() {
  return (
    <div className="App">
      <div className='App__container'>
        <h1>Password Generator</h1>
        <div className='App__container__lenght'></div>
        <div className='App__container__include'></div>
        <div className='App__container__strenght'></div>
        <div className='App__container__password'></div>
      </div>
    </div>
  );
}

export default App;
