import React from 'react';
import Left from './Left.png'
import SLogo from './SLogo.png'
import './App.css';
var apigClientFactory = require('./apigClient').default;

class SmartDoor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      phone: '',
      apigClient: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState(
      {
        name: event.target.value
      }
    );
  }

  handlePhoneChange(event) {
    this.setState(
      {
        phone: event.target.value
      }
    );
  }

  handleSubmit(event) {
    let info = {
      "name": String(this.state.name),
      "phone": String(this.state.phone),
      "status": "access"
    }

    console.log(info)
    event.preventDefault();
    this.state.apigClient.chatbotPost(null, info)
    .then((response) => {
      alert(response.data.statusCode === 200 ? "OTP will be sent to the visitor!" : "The visitor is denied access!")
    })
    .catch((result) => {
      console.error(result);
    });
  }

  handleDeny(event) {
    let info = {
      "name": String(this.state.name),
      "phone": String(this.state.phone),
      "status": "denied"
    }
    console.log(info)
    event.preventDefault();
    this.state.apigClient.chatbotPost(null, info)
    .then((response) => {
      console.log(response)
    })
    .catch((result) => {
      console.error(result);
    });
    alert("The visitor is denied access!")
  }

  componentDidMount() {
    var apigClient = apigClientFactory.newClient({
      apiKey: 'FkyIncQsVR5jEvdmFCfTu2OXI5vcpQcZR2CrbcVc'
    });

    this.setState({
      apigClient : apigClient
    });
  }
  
  render() {
    return (
      <div className="App">
        <img src={Left} className="Left-img" alt = ""/>   
        <img src={SLogo} className="S-logo" alt = ""/>    
        <label className="text-label">Please enter the info for the visitor</label>
        <form>
          <label className="name-label">Name</label>
          <input 
            onChange={this.handleNameChange}
            type="text" 
            value={this.state.name}
            className="name-input" 
            placeholder="Bruce Wayne" 
            autoFocus="{true}">
          </input>
          <label className="phone-label">Phone Number</label>
          <input 
            onChange={this.handlePhoneChange}
            type="text" 
            value={this.state.phone}
            className="phone-input"
            placeholder="9999999999" 
            autoFocus="{true}">
          </input>
          <button type="submit" name="access-button" className="access-button" onClick={this.handleSubmit}>GIVE ACCESS</button>
          <button type="submit" name="deny-button" className="deny-button" onClick={this.handleDeny.bind(this)}>DENY</button>
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
