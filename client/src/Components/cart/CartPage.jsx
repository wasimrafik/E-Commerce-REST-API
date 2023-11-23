import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAsync, getCartAsync } from "../../features/cart/cartAPI";
import { getCart, removeItemFromCart } from "../../features/cart/cartSlice";

export default function CartPage() {
  const user = useSelector(selectLoggedInUser);
  const cartProducts = useSelector(getCart);
  const dispatch = useDispatch();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    dispatch(getCartAsync(user.Data));
  }, [dispatch, user.Data]);

  useEffect(() => {
    if (cartProducts.Data) {
      const quantities = {};
      cartProducts.Data.forEach((product) => {
        quantities[product._id] = product.quantity;
      });
      setSelectedQuantities(quantities);
    }
  }, [cartProducts.Data]);

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [productId]: newQuantity,
    });
  };

  useEffect(() => {}, []);

  const handleRemoveItem = (cartID) => {
    console.log(`Removing item with ID: ${cartID}`);
    dispatch(deleteCartAsync(cartID));

    dispatch(getCartAsync(user.Data));

  };

  const calculateTotalPrice = () => {
    if (!cartProducts.Data) {
      return 0;
    }

    let totalPrice = 0;
    cartProducts.Data.forEach((product) => {
      totalPrice += product.products.price * selectedQuantities[product._id];
    });

    return totalPrice;
  };

  return (
    <div>
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight p-5 text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {Array.isArray(cartProducts.Data) &&  cartProducts.Data?.map((product) => (
                <li key={product?._id} className="flex py-6 mb-1">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.products?.imageUrl}
                      alt={product.products?.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product?.href}>{product?.name}</a>
                        </h3>
                        <p className="ml-4">$ {product.products?.price}</p>{" "}
                      </div>
         
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>

                        <select
                          value={selectedQuantities[product?._id]}
                          onChange={(e) =>
                            handleQuantityChange(
                              product?._id,
                              Number(e.target.value)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5].map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(product?._id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {calculateTotalPrice().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
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
  );
}
