import React from 'react';
import Success from './Success.png'
import './SuccessPage.css'

class Access extends React.Component {
  
  render() {
    console.log("AccessStatus");
    return (
      <div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  This is an alert box.
</div>
    )
  }
}

function SuccessPage() {
  return (
    <div>
      <Access/>
    </div>
  )
}

export default SuccessPage;