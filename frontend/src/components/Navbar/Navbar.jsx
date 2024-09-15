import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { CiSearch } from "react-icons/ci";
import { FaBasketShopping } from "react-icons/fa6";
import { Storecontext } from '../../Context/Storecontext';
import { toast } from 'react-toastify';
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
function Navbar({ setshowlogin }) {
  const [menu, setMenu] = useState("home");
  const { token, settoken } = useContext(Storecontext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    settoken("")
    navigate("/");
    toast.success("successfully  logged out");
  }
  return (
    <div className='navbar' >
      <Link to='/'><p className='logo'> Nakoda Cake </p></Link>
      <ul className='navbar-menu' >
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile app</a>
        <a href='#contactus' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className='navbar-right' >
        <CiSearch className='icon' />
        <div className="navbar-search-icon">
          <Link to={"/cart"} > <FaBasketShopping onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : "icon"} /><div className='dot active'></div></Link>        
        </div>
        {!token ? <button onClick={() => setshowlogin(true)} className='button' setshowlogin={setshowlogin} >Sigin</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')} ><MdOutlineShoppingBag className='bag' /><p>Orders</p></li>
              <hr />
              <li onClick={logout} ><IoLogOutOutline className='log' /><p>Logout</p></li>
            </ul>

          </div>
        }

      </div>
    </div>
  )
}

export default Navbar