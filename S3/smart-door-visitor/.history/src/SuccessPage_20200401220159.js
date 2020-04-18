import React, { Component } from 'react';
// class SuccessAlert extends Component {
//   render() {
//           return (
//           <div class="alert">
//   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
//   This is an alert box.
// </div>
// )
//   }
// }

const SuccessAlert = props => (
<div class="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
   This is an alert box.
  </div>
)

export default SuccessAlert; 