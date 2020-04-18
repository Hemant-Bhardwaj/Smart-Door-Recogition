import React from 'react';
import Left from './Left.png'
import SLogo from './SLogo.png'
import './App.css';
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
        <label className="text-label">Please enter the info for the visitor</label>
        <form>
          <label className="name-label">Name</label>
          <input type="text" className="name-input"></input>
          <label className="phone-label">Phone Number</label>
          <input type="text" className="phone-input"></input>
          <button type="submit"className="access-button">GIVE ACCESS</button>
          <button className="deny-button">DENY</button>
        </form>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <SmartDoor/>
    </div>
  )
}

export default App;
