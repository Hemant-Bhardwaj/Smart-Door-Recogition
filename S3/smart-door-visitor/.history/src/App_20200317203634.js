import React from 'react';
import './App.css';
import Camera_ON from './Camera_ON.jpg'

function App() {



  return (
    <div className="App">
      <img src={Camera_ON} className="Camera-logo"/>    
      <label className="text-label">Please enter the OTP</label>
       <label className="otp-label">OTP</label>
        <input type="text" className="otp-input"></input>
        <button className="unlock-button">UNLOCK</button>
    </div>
  );
}

export default App;
