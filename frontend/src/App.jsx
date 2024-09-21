import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Placeorder from './pages/placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import Loginpopup from './components/Loginpopup/Loginpopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import Myorder from './pages/Myorder/Myorder';

const App = () => {
  const [showlogin, setshowlogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showlogin ? <Loginpopup setshowlogin={setshowlogin} /> : null}
      <div className='app'>
        <Navbar setshowlogin={setshowlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder setshowlogin={setshowlogin} />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<Myorder />} />
        </Routes>
        <hr className='mt-6 ' />
        <Footer/>
      </div>
    </>
  );
};

export default App;
