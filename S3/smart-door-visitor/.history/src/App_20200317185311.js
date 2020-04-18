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
       <label className="name-label">Name</label>
        <input type="text" className="name-input"></input>
        <label className="phone-label">Phone Number</label>
        <input type="text" className="phone-input"></input>
        <button className="access-button">GIVE ACCESS</button>
        <button className="deny-button">DENY</button>
    </div>
  );
}

export default App;
