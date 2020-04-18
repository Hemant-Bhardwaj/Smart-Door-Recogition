import React, { Component  } from 'react';

class SuccessAlert extends Component {
  render() {
          return (
          <div className="alert">
  <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  This is an alert box.
</div>
)
  }
}



export default SuccessAlert; 