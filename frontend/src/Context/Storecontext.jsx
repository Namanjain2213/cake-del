import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
   const [cartitem, setcartitems] = useState({});
   const [food_list, setfood_list] = useState([]);
   const url = "https://cake-del.onrender.com";
   const [token, settoken] = useState("");

   const addtocart = async (itemId) => {
      try {
         if (!cartitem[itemId]) {
            setcartitems((prev) => ({ ...prev, [itemId]: 1 }));
         } else {
            setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
         }
         if (token) {
            await axios.post(url +"/api/cart/add",{itemId},{headers:{token}});
         }
      } catch (error) {
         console.error("Failed to add item to cart:", error);
      }
   };

   const removetocart = async (itemId) => {
      if (cartitem[itemId] > 0) {
         setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      }
      if (cartitem[itemId] <= 1) {
         const updatedCart = { ...cartitem };
         delete updatedCart[itemId];
         setcartitems(updatedCart);
      }
      try {
         if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
         }
      } catch (error) {
         console.error("Failed to remove item from cart:", error);
      }
   };

   const gettotalcartamount = () => {
      let totalamount = 0;
      for (let item in cartitem) {
         if (cartitem[item] > 0) {
            let iteminfo = food_list.find((product) => product._id === item);
            totalamount += iteminfo.price * cartitem[item];
         }
      }
      return totalamount;
   };

   const fetchfoodList = async () => {
      try {
         const response = await axios.get(url + "/api/food/list");
         setfood_list(response.data.data);
      } catch (error) {
         console.error("Failed to fetch food list:", error);
      }
   };
   const loadcartData = async (token) => {
      try {
         const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
         console.log("Full API response:", response);
            setcartitems(response.data.cartData);
      } catch (error) {
         console.error("Failed to load cart data:", error);
      }
   };
   useEffect(() => {
      const loadData = async () => {
         await fetchfoodList();
         const localToken = localStorage.getItem("token");
         if (localToken) {
            settoken(localToken);
            await loadcartData(localToken);
         }
      };
      loadData();
   }, []);

   const contextValue = {
      food_list,
      cartitem,
      setcartitems,
      addtocart,
      removetocart,
      gettotalcartamount,
      url,
      token,
      settoken
   };

   return (
      <Storecontext.Provider value={contextValue}>
         {props.children}
      </Storecontext.Provider>
   );
};

export default StoreContextProvider;
