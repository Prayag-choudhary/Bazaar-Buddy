import React from 'react'

function signUp() {
  return (
   
    <div className="body_b">

  <div className="signup-card">
    <h2>Create Account</h2>
    <form action="#" method="POST">
      <div className="role-selection mb-3">
        <label><input type="radio" name="role" value="customer" checked onchange="toggleShopFields()"/> Customer</label>
        <label><input type="radio" name="role" value="shopkeeper" onchange="toggleShopFields()"/> Shopkeeper</label>
      </div>

      <div id="shopFields" >
        <div className="mb-3">
          <label for="shopName" className="form-label">Shop Name</label>
          <input type="text" className="form-control" id="shopName" name="shopName" placeholder="Enter your shop name"/>
        </div>
        <div className="mb-3">
          <label for="shopDomain" className="form-label">Shop Domain</label>
          <input type="text" className="form-control" id="shopDomain" name="shopDomain" placeholder="e.g. Electronics, Grocery"/>
        </div>
        <div className="mb-3">
          <label for="shopLocation" className="form-label">Shop Location</label>
          <input type="text" className="form-control" id="shopLocation" name="shopLocation" placeholder="City / Address"/>
        </div>
        <div className="mb-3">
          <label for="ownerName" className="form-label">Owner Name</label>
          <input type="text" className="form-control" id="ownerName" name="ownerName" placeholder="Enter owner's full name"/>
        </div>
      </div>
      <div className="mb-3">
        <label for="username" className="form-label">Username</label>
        <input 
          type="text" 
          className="form-control" 
          id="username" 
          name="username" 
          placeholder="Enter your username" 
          required />
      </div>

      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          name="password" 
          placeholder="Enter your password" 
          required />
      </div>

      <div className="mb-4">
        <label for="phone" className="form-label">Phone Number</label>
        <input 
          type="tel" 
          className="form-control" 
          id="phone" 
          name="phone" 
          placeholder="Enter your phone number" 
          pattern="[0-9]{10}" 
          required />
      </div>

      <button type="submit" className="btn btn-signup">Sign Up</button>
    </form>
  </div>

</div>

  )
}

export default signUp