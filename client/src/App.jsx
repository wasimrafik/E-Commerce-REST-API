import React from "react";
import Home from "./Components/homePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



// axios.defaults.baseURL = "http://localhost:8001/";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
           <Route path="/" element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home /> } />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/productDetails" element={<ProductsDetails />} />
          </Route>


          <Route path="/" element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          </Route>
          
      </Routes>
      </Router>
    </div>
  );
}

export default App;
