import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../../features/auth/authSlice";
import { checkout, getOrders } from "../../../features/checkOut/checkOutSlice";
import { findOrderAsync } from "../../../features/checkOut/checkOutAPI";

const SuccessPage = () => {
  const user = useSelector(selectLoggedInUser);
  const order = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findOrderAsync(user.Data));
    console.log(order);
  }, [dispatch, user.Data, order]);

  // console.log(user);
  console.log(order);

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>

      <p className="text-gray-800 mb-6">
        Thank you for shopping with us. Your order has been placed successfully.
      </p>

      <div className="border-t border-gray-300 py-4">
        <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
        <ul>
          {order && order.length > 0 && (
            <>
              <li>
                <strong>Order ID:</strong> {order}
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="mt-8">
        <Link to="/home">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
