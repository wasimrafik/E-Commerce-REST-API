import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Cart from "../../features/cart/Cart";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkout, selectAddress } from "../../features/checkOut/checkOutSlice";
import {
  addAddressAsync,
  deleteAddressAsync,
  fetchAllAddressAsync,
} from "../../features/checkOut/checkOutAPI";
import { selectLoggedInUser } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { getCart } from "../../features/cart/cartSlice";
import { useState } from "react";
import { deleteCartAsync } from "../../features/cart/cartAPI";

const CheckOutPage = () => {
  const [total, setTotal] = useState(0);
  const [addressID, setAddressID] = useState('')
  const [paymentOptions, setPaymentOptions] = useState('')
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  let { filterParams } = useParams();
  const addresses = useSelector(selectAddress);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const cart = useSelector(getCart);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchAddresses = async () => {
    try {
      await dispatch(fetchAllAddressAsync({ userID: user.Data }));
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };


  const calculateSubTotal = () => {
    if(cart && cart.Data){
      return cart.Data.reduce((subtotal, product) => {
        return subtotal + product.products.price * product.quantity;
      }, 0)
    }
    return 0;
  }

  const subtotal = calculateSubTotal();

  useEffect(() => {
    console.log(cart.Data);
    fetchAddresses();
    setLoading(false);
  }, [dispatch, user.Data]);
  console.log(addresses);

  const paramsUser = user.Data;

  useEffect(() => {
    const filterParams = new URLSearchParams(location.search);

    let filterValue = filterParams.getAll(user.Data);
    // Fetch addresses only if they are not already available
  }, [user.Data]);
  console.log(addresses);
  if (loading) {
    return <p>Loading addresses...</p>;
  }

  const handleDeleteAddress = (address) => {
    console.log("delete Address", address._id);
    dispatch(deleteAddressAsync(address._id))
    fetchAddresses()
  }

const handleSelectAddress = (address) => {
  console.log(address._id);
  setAddressID(address._id)
} 
// const getPaymentOption = (option) => {
//   console.log("Selected payment option:", option);
//   setPaymentOPtions(option); // Assuming you have a state variable for payment options
// };

console.log(cart.Data[0].user);
return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose from Exisiting addresses
        </p>
        <div>
          <div className="flex justify-center mb-4">
            <Link
              to={"/checkout/getAddress"}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add address
            </Link>
          </div>
        </div>
        <ul>
          {addresses && addresses.length !== 0 ? (
            addresses.map((address) => (
              <li
                key={address._id}
                className="flex justify-between gap-x-6 py-5 px-3 border-solid border-2 border-gray-200"
              >
                <div className="flex min-w-0 gap-x-4">
                  <input
                    id="exsitingAddress"
                    name="payments"
                    type="radio"
                    onChange={() => handleSelectAddress(address)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.fullName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.streetAddress}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pincode}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {address.city}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {address.state}
                  </p>
                </div>
                <div className="">
                  <button className="bg-red-500 p-2 px-4 rounded-xl"
                    onClick={() => handleDeleteAddress(address)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="flex justify-center mt-4">
              <Link
                to={"/checkout/getAddress"}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add address
              </Link>
            </div>
          )}
        </ul>
      </div>

      {/* Cart Section  */}

      <div className="lg:col-span-2">
        <div>
          <div className="mx-auto mt-5 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
            {/* payment Methods  */}
            <div className="mt-10 space-y-10">
              <fieldset className="flex justify-evenly">
                <legend className="text-sm font-semibold leading-6 text-center text-gray-900">
                  Payment Methods
                </legend>

                <div className="sm:col-span-2 inline-block">
                  <div className="mt-2">
                    <input
                      id="cash"
                      type="radio"
                      name="payment"
                      value="Cash"        
                      onChange={(e) => setPaymentOptions(e.target.value)}                                  
                      className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    
                    <label className="mt-1 text-sm leading-6 text-gray-600">
                      Cash
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 inline-block">
                  <div className="mt-2">
                    <input
                      id="Card"
                      type="radio"
                      name="payment"
                      value="Card" 
                      onChange={(e) => setPaymentOptions(e.target.value)}                                     
                      className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    
                    <label className="mt-1 text-sm leading-6 text-gray-600">
                      Card Payment
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* Cart  */}
              <div className="mt-8 mx-auto max-w-7xl px-3 sm:px-3 lg:px-3">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight p-5 text-gray-900">
                      Cart
                    </h1>
                  </div>
                  <div>
                    <Link to={"/cart"}>
                      <p className="text-xl mt-5 font-semibold px-5 rounded-xl text-white tracking-tight p-2 bg-blue-900">
                        Edit Your Cart
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart?.Data.map((product) => (
                      <li key={product.id} className="flex py-6 mb-1">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.products.imageUrl}
                            alt={product.products.imageUrl}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.color}</a>
                              </h3>
                              <p className="ml-1">$ {product.products.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="mt-1 text-sm text-gray-500">
                              QTY {product.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mx-auto max-w-7xl lg:px-8">
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="flex justify-between mt-3 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/pay"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/home">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
