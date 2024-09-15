import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/sidebar'
import List from './pages/List/List'
import Add from './pages/Addproduct/Add'
import Order from './pages/Order/Order'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url = "https://cake-del.onrender.com" 
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} />}  />
          <Route path="/list" element={<List url={url} />}  />
          <Route path="/orders" element={<Order url={url} />}  />
        </Routes>
      </div>
    </div>
  )
}

export default App