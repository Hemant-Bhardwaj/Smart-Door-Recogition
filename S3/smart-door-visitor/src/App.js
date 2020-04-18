import React from 'react';
import './App.css';
import SLogo from './SLogo.png'
import Left from './Left.png'
import Camera_ON from './Camera_ON.jpg'
var apigClientFactory = require('./apigClient').default;

class SmartDoor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      otp: '',
      apigClient: null,
      unlock: null
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
    event.preventDefault();

    let otp = {
      "otp": parseInt(this.state.otp)
    }

    console.log(otp)
    this.state.apigClient.chatbotPost(null, otp)
    .then((response) => alert(response.data.statusCode === 200 ? `Unlocked. Hello ${response.data.body}` : "Inavlid OTP")
    
    // alert(response.data)
    )
    .catch((result) => {
      console.error(result);
    });    
    
  }

  componentDidMount() {
    var apigClient = apigClientFactory.newClient({
      apiKey: 'Mq40tQodAD3NPSSCiNRbe5LjngNbUXWX7Dqm5KvP'
    });

    this.setState({
      apigClient : apigClient
    });
  }

  render() {
    return (
      <div className="App">
      <img src={Left} className="Left-img" alt = ""/ >  
        <img src={SLogo} className="S-logo" alt = ""/>   
        <label className="text-label">Please enter the OTP</label>
         <label className="otp-label">OTP</label>
          <input 
            type="text" 
            onChange={this.handleChange}
            className="otp-input" 
            placeholder="******"></input>
          <button className="unlock-button" onClick={this.handleSubmit}>UNLOCK</button>
      </div>
    );
  }
}

function App() {

  return (
      <SmartDoor/>
  );
}

export default App;
