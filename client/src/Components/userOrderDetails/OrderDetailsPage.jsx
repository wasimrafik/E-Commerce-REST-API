import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { findOrderByUser } from '../../features/checkOut/checkOutAPI';
import { selectLoggedInUser } from '../../features/auth/authSlice';
import { getOrders } from '../../features/checkOut/checkOutSlice';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
     
   const dispatch = useDispatch();
   const user =  useSelector(selectLoggedInUser)
   const orderByUser =  useSelector(getOrders)
   
  useEffect(() => {
    console.log(user.Data);
    const userID = user.Data;
    
    dispatch(findOrderByUser(userID))
    console.log(orderByUser);
  }, [dispatch, user]);

  return (
    <div>
      <h1>Order Details</h1>
      {orders.map((order) => (
        <div key={order.orderId}>

          <h2>Order ID: {order.orderId}</h2>
          <ul>
            {order.products.map((product) => (
              <li key={product.productId}>
                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                <span>{product.name}</span>
                <span>Price: {product.price}</span>
                <span>Quantity: {product.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
