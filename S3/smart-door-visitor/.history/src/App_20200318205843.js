import React from 'react';
import './App.css';
import SLogo from './SLogo.png'
import Left from './Left.png'

function App() {



  return (
    <div className="App">
    <img src={Left} className="Left-img"/>  
      <img src={SLogo} className="S-logo"/>   
      <label className="text-label">Please enter the OTP</label>
       <label className="otp-label">OTP</label>
        <input type="text" className="otp-input" placeholder="******"></input>
        <button className="unlock-button">UNLOCK</button>
    </div>
  );
}

export default App;
