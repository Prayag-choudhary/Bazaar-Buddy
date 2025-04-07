import React from 'react'

function signIn() {
  return (
    <>
      
<div className="body_a">

  <div className="login-card text-center">
    <h2>🔐 Login</h2>
    <form action="#" method="POST">
      
      
      <div className="mb-3 text-start">
        <label className="form-label">Phone Number</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
          <input 
            type="tel" 
            className="form-control" 
            name="phone" 
            placeholder="Enter your phone number" 
            pattern="[0-9]{10}" 
            required />
          <button className="btn btn-send-otp" type="button">Send OTP</button>
        </div>
      </div>

    
      <div className="mb-3 text-start">
        <label className="form-label">Enter OTP</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-shield-lock-fill"></i></span>
          <input 
            type="text" 
            className="form-control" 
            name="otp" 
            placeholder="Enter the OTP" 
            maxlength="6"/>
        </div>
      </div>

 
      <div className="divider"><span>OR</span></div>

      <div className="mb-3 text-start">
        <label className="form-label">Username</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            placeholder="Enter your username"/>
        </div>
      </div>

    
      <div className="mb-2 text-start">
        <label className="form-label">Password</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            placeholder="Enter your password"/>
        </div>
      </div>

      
      <div className="mb-4 text-end">
        <a href="/" className="forgot-link">Forgot Password?</a>
      </div>

   
      <button type="submit" className="btn btn-custom w-100">Login</button>
    </form>
  </div>
</div>

</>
  )
}

export default signIn;