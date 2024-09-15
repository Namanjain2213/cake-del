import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets_admin.js'
function Navbar() {
  return (
    <div className='navbar'>
      <div className="logo">
        <h3>Nakoda Cake</h3>
        <p>Admin Panel</p>
      </div>
      <img src={assets.profile_image} alt="" className='profile' />
      
    </div>
  )
}

export default Navbar