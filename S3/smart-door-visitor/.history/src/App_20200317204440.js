import React from 'react';
import './App.css';
import Camera_ON from './Camera_ON.jpg'
import SLogo from './SLogo.png'

function App() {



  return (
    <div className="App">
      <img src={Camera_ON} className="Camera-logo"/> 
      <img src={SLogo} className="S-logo"/>   
      <label className="text-label">Please enter the OTP</label>
       <label className="otp-label">OTP</label>
        <input type="text" className="otp-input" placeholder="******"></input>
        <button className="unlock-button">UNLOCK</button>
    </div>
  );
}

export default App;
