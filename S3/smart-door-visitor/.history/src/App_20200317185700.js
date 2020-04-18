import React from 'react';
import './App.css';
import Camera_ON from './Camera_ON.jpg'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <img src={Camera_ON} className="Camera-logo"/>    
       <label className="otp-label">OTP</label>
        <input type="text" className="otp-input"></input>
        <button className="unlock-button">UNLOCK</button>
    </div>
  );
}

export default App;
