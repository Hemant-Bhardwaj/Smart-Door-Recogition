import React from 'react';
import Success from './Success.png'
import './SuccessPage.css'

class Access extends React.Component {
  
  render() {
    return (
      <div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  This is an alert box.
</div>
    )
  }
}

function SuccessAlert() {
  return (
    <div>
      <Access/>
    </div>
  )
}

export default SuccessAlert;