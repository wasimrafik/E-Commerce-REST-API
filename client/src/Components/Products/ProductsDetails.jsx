import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
// import { addToCartAsync } from "../../features/cart/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../features/auth/authSlice";
import { addToCartAsync } from "../../features/cart/cartAPI";
// import { selectCart } from "../../features/cart/cartSlice";
import {
  selectAllProducts,
  selectSingleProducts,
} from "../../features/productList/ProductListSlice";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",

//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//     { name: "3XL", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductsDetails = () => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const user = useSelector(selectLoggedInUser);
  const product = useSelector(selectSingleProducts);
  // const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  console.log(user);
  console.log(product.products);
  useEffect(() => {}, [product.products]);

  const handelCart = (e) => {
    e.preventDefault();

    if (color && size) {
      const newItem = {
        ...product,
        quantity: 1,
        userID: user.Data,
        color,
        size,
      };

      dispatch(addToCartAsync(newItem));
      console.log(newItem);
    } else {
      console.log("Please select color and size before adding to the cart.");
    }
  };

  return (
    <>
      {product.products ? (
        <div>
          <div>
            <div className="bg-white">
              <div className="pt-6">
                <nav aria-label="Breadcrumb">
                  <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {product.breadcrumbs &&
                      product.breadcrumbs.map((breadcrumb) => (
                        <li key={breadcrumb.id}>
                          <div className="flex items-center">
                            <a
                              href={breadcrumb.href}
                              className="mr-2 text-sm font-medium text-gray-900"
                            >
                              {breadcrumb.name}
                            </a>
                            <svg
                              width={16}
                              height={20}
                              viewBox="0 0 16 20"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-5 w-4 text-gray-300"
                            >
                              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                          </div>
                        </li>
                      ))}
                    <li className="text-sm">
                      <a
                        href={product.href}
                        aria-current="page"
                        className="font-medium text-gray-500 hover:text-gray-600"
                      >
                        {product.title}
                      </a>
                    </li>
                  </div>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={product.products.imageUrl}
                      alt={product.imageUrl}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={product.products.imageUrl}
                        alt={product.products.imageUrl}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={product.products.imageUrl}
                        alt={product.products.imageUrl}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={product.products.imageUrl}
                      alt={product.products.imageUrl}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {product.products.title}
                    </h1>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        {product.products.brand}
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">
                      {product.products.discountPersent} %
                    </p>
                    <p className="text-3xl tracking-tight line-through	 text-gray-500">
                      $ {product.products.price}
                    </p>
                    <p className="text-3xl tracking-tight text-gray-900">
                      $ {product.products.discountedPrice}
                    </p>
                    {/* Reviews */}
                    {/* <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    product.rating > rating
                      ? "text-gray-900"
                      : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">{product.rating.average} out of 5 stars</p>
            <a
              href={product.rating.href}
              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {product.rating.totalCount} reviews
            </a>
          </div>
        </div> */}

                    <form className="mt-10">
                      Colors
                      <div>
                        {/* <RadioGroup
                          value={color}
                          onChange={color}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {product.products.color &&
                              Array.isArray(product.products.color) &&
                              product.products.color.map((color) => {
                                console.log(color);
                                const bgColorClasss = color.name.toLowerCase();
                                const bgColorClass = `bg-${bgColorClasss}`;

                                console.log(bgColorClass);
                                return (
                                  <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                      classNames(
                                        color.selectedClass,
                                        active && checked
                                          ? "ring ring-offset-1"
                                          : "",
                                        !active && checked ? "ring-2" : "",
                                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                      )
                                    }
                                  >
                                    <RadioGroup.Label
                                      as="span"
                                      className="sr-only"
                                    >
                                      {color.name}
                                    </RadioGroup.Label>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        `h-8 w-8 rounded-full border bg-black border-black border-opacity-10`
                                      )}
                                    />
                                  </RadioGroup.Option>
                                );
                              })}
                          </div>
                        </RadioGroup> */}


<RadioGroup
  value={color}
  onChange={(newColor) => setColor(newColor)}
  className="mt-4"
>
  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
  <div className="flex items-center space-x-3">
    {product.products.color &&
      Array.isArray(product.products.color) &&
      product.products.color.map((colorOption) => {
        const bgColorClass = `bg-${colorOption.name}`;

        return (
          <RadioGroup.Option
            key={colorOption.name}
            value={colorOption.name}
            className={({ active, checked }) =>
              classNames(
                colorOption.selectedClass,
                active && checked ? "ring ring-offset-1" : "",
                !active && checked ? "ring-2" : "",
                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
              )
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {colorOption.name}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={classNames(`h-8 w-8 rounded-full border ${bgColorClass} border-black border-opacity-10`)}
            />
          </RadioGroup.Option>
        );
      })}
  </div>
</RadioGroup>
                      </div>
                      {/* Sizes */}
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                          <Link
                            href="#"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Size guide
                          </Link>
                        </div>

                        <RadioGroup
                          value={size}
                          onChange={(newSize) => setSize(newSize)}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a size
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {product.products.color &&
                              Array.isArray(product.products.color) &&
                              product.products.size.map((size) => (
                                <RadioGroup.Option
                                  key={size.name}
                                  value={size.name}
                                  disabled={!size.quantity}
                                  className={({ active }) =>
                                    classNames(
                                      size.name
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size.name}
                                      </RadioGroup.Label>
                                      {size.quantity ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-indigo-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <button
                        onClick={handelCart}
                        type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                    </form>
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Description and details */}
                    <div>
                      <div className="mt-3">
                        <h2 className="text-sm font-medium text-gray-900">
                          Details
                        </h2>
                        {product.products.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProductsDetails;
