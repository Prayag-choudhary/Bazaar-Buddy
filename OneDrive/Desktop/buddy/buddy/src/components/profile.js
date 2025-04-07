import React from 'react'
import {Link} from 'react-router-dom'
function profile() {
  return (

<>
    <div className="body-area">

    <div className="app-container">
        <div className="app-title">Bazaar Buddy</div>
        <Link to="/signIn" className="btn btn-custom btn-login">Sign In</Link>
        <Link to="/signUp" className="btn btn-custom btn-signup">Sign Up</Link>
    </div>

    </div>
</>
  )
}

export default profile