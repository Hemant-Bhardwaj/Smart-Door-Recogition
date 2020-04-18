import React from 'react';
import './App.css';
import SLogo from './SLogo.png'
import Left from './Left.png'
import Camera_ON from './Camera_ON.jpg'
import SuccessAlert from './SuccessPage';
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
      "otp": (this.state.otp)
    }

    console.log(otp)
    this.state.apigClient.chatbotPost(null, otp)
    .then((response) => console.log(response)
    // this.setState(() => ({
    //   unlock: true
    // }))
    )
    .catch((result) => {
      console.error(result);
    });

    console.log(this.state.unlock)
// alert('                                               Success')
    return (
      this.state.unlock ? 
        <div>
          <img src={Camera_ON} className="Camera-logo" alt = ""/>   
        </div>
        :
        <SuccessAlert/>
      )
    
    
  }

  componentDidMount() {
    var apigClient = apigClientFactory.newClient({
      apiKey: 'bla6PcRXqm3mkFhnq9Rx6oH22HOr5YA6cN6ZRWZ2'
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
