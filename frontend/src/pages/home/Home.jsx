import React, { useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Exploremenu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Appdownload from '../../components/appdownload/Appdownload';
function Home() {
  const [category,setcategory] = useState("All");

  return (
    <div>
        <Header/>
        <Menu category={category} setcategory={setcategory} />
        <FoodDisplay category={category} />
         <Appdownload/>    
    </div>
  )
}

export default Home