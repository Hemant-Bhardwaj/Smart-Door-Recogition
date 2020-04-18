import React, { Component  } from 'react';
import './SuccessPage.css';

class SuccessAlert extends Component {
  render() {
          return (
          <div className="alert">
  <span className="closebtn" onClick="this.parentElement.style.display='none';">&times;</span> 
  This is an alert box.
</div>
)
  }
}



export default SuccessAlert;  