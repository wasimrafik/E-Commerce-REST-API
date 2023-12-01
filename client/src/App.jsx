import React, { useEffect } from "react";
import Home from "./Components/homePage/Home";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./Components/login/LoginPage";
import SignupPage from "./Components/signup/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./Components/cart/CartPage";
import CheckOutPage from "./Components/checkOut/CheckOutPage";
import ProductsDetails from "./Components/Products/ProductsDetails";
import ProductList from "./Components/Products/ProductList";
import axios from "axios";
import ProtectedRoutes from "./Components/routes/protectedRoutes/ProtectedRoutes";
import PublicRoutes from "./Components/routes/publicRoutes/PublicRoutes";
import PageNotFound from "./pages/PageNotFound404";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { getCart } from "./features/cart/cartSlice";
import { getCartAsync } from "./features/cart/cartAPI";
import Address from "./Components/checkOut/Address";
import SuccessPage from "./Components/checkOut/confirmationPage/SuccessPage";
import ProfilePage from "./Components/profile/ProfilePage";
import OrderDetails from "./Components/userOrderDetails/OrderDetailsPage";


axios.defaults.baseURL = "http://localhost:8001/";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const cart = useSelector(getCart);


  // console.log(user.Data);
  useEffect(() => {
 
    dispatch(getCartAsync(user.Data))
    console.log(cart);
    console.log(user.Data);

  },[user, dispatch])
  return (
    <div className="App">
      <Router>
        <Routes>
           <Route path="/" element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home /> } />
          <Route path='/' element={<Home /> } />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/product/getSingleProduct/:filterParams" element={<ProductsDetails />} />
          <Route path="/checkout/getAddress" element={<Address />} />
          <Route path="/OrderConfrimationPage" element={<SuccessPage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/myOrders" element={<OrderDetails />} />
          <Route path="*" element={<PageNotFound />} />
          </Route>


          <Route path="/" element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />

          </Route>
          
      </Routes>
      </Router>
    </div>
  );
}

export default App;
