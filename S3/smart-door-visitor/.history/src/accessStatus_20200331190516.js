import React from 'react';
import Success from './Success.png'

function Header() {
  // Import result is the URL of your image
  return <img src={Success} alt="Logo" />;
}
export default Header;

// class Access extends React.Component {
//   render() {
//     return (
//       <div>
//         <img src={Success} className="Success-img" alt = ""/>   
//       </div>
//     )
//   }
// }

// function AccessStatus() {
//   return (
//     <div>
//       <Access/>
//     </div>
//   )
// }

// export default AccessStatus;