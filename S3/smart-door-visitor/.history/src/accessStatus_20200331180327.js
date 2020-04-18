import React from 'react';
import Left from './Left.png'

class Access extends React.Component {
  render() {
    return (
      <div>
        <img src={Left} className="Left-img" alt = ""/>   
      </div>
    )
  }
}

function AccessStatus() {
  return (
    <div>
      <Access/>
    </div>
  )
}

export default AccessStatus;