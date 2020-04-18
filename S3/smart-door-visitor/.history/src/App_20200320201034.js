import React from 'react';
import './App.css';
import SLogo from './SLogo.png'
import Left from './Left.png'
var apigClientFactory = require('./apigClient').default;


class SmartDoor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      otp: '',
      apigClient: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        otp: event.target.value
      }
    );
  }

  handleSubmit(event) {
    let otp = {
      "otp": (this.state.otp)
    }

    console.log(otp)
    event.preventDefault();
    this.state.apigClient.chatbotPost(null, otp)
    .then((response) => {
      console.log(response)
    })
    .catch((result) => {
      console.error(result);
    });
  }

  componentDidMount() {
    var apigClient = apigClientFactory.newClient({
      apiKey: 'xVvAPu9NXK4f83FnTlA7oaoCSOqPh70R5yX9kOEv'
    });

    this.setState({
      apigClient : apigClient
    });
  }

  render() {
    return (
      <div className="App">
      <img src={Left} className="Left-img"/ >  
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
