import React from 'react';
import './App.css';
import SLogo from './SLogo.png'
import Left from './Left.png'
var apigClientFactory = require('./apigClient').default;


class SmartDoor extends React.Component {
  componentDidMount() {
    var apigClient = apigClientFactory.newClient({
      apiKey: '9hZb0ZhFwX6USt9wlWvZv1dtqNG7q1Nk75J2Z2hm'
    });

    this.setState({
      apigClient : apigClient
    });
  }

  render() {
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
}

function App() {

  return (
    <div className="App">
      <SmartDoor/>
    </div>
  );
}

export default App;
