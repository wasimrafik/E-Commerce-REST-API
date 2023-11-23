// import cartModel from "../Models/cart.model";
// import cartItemModel from "../Models/cartItem.model";
// import productModel from "../Models/product.model";
// import userModuel from "../Models/user.moduel";

// export const getCartItems = async (req, res) => {
//   try {
//     const id = req.params.userID;

//     const getUser = await userModuel.find({ _id: id });

//     if (getUser) {
//       const getCartItems = await cartItemModel.find();

//       if (getCartItems) {
//         return res.status(200).json({
//           Data: getCartItems,
//           Message: "Address Details Get Sucessfully",
//           result: getCartItems.length,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };

// // export const addCartItems = async (req, res) => {
// //   try {
// //     const id = req.params.userID;
// //     const { product, size, quantity, price, DiscountedPrice } = req.body;

// //     // console.log(user, product);

// //     const getUser = await userModuel.findOne({ _id: id });

// //     if (!getUser) {
// //       return "please Login";
// //     }

// //     const getUserCart = await cartModel.findOne({ user: id });

// //     if (!getUserCart) {
// //       const addNewCart = new cartModel({
// //         user: id,
// //       });
// //       getUserCart = await addNewCart.save();
// //     }

// //     const addCartItems = new cartItemModel({
// //       cart: getUserCart._id,
// //       product,
// //       size,
// //       quantity,
// //       price,
// //       DiscountedPrice,
// //       user: id,
// //     });

// //     await addCartItems.save();

// //     if (addCartItems) {
// //       return res.status(200).json({
// //         Data: addCartItems,
// //         Message: "Cart Items added sucessfully Added ",
// //       });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       Message: error.message,
// //     });
// //   }
// // };

// // export const UpdateCartItems = async (req, res) => {
// //   const id = req.params.cartItemsID;

// //   try {
// //     const { cart, product, size, quantity, price, DiscountedPrice, user } =
// //       req.body;

// //     // console.log(user, orderItems);
// //     const getUser = await userModuel.findOne({ _id: user });
// //     const getProducts = await productModel.findOne({ _id: product });

// //     if (!getUser) {
// //       return "please Login";
// //     }
// //     if (!getProducts) {
// //       return "please Add Products";
// //     }
// //     const UpdateCartItems = await adressesModel.findOne(
// //       { _id: id },
// //       {
// //         $set: {
// //           cart,
// //           product,
// //           size,
// //           quantity,
// //           price,
// //           DiscountedPrice,
// //           user,
// //         },
// //       }
// //     );
// //     if (UpdateCartItems.acknowledged) {
// //       return res.status(201).json({
// //         data: UpdateCartItems,
// //         Message: "CartItems Updated Sucessfully",
// //       });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       Message: error.message,
// //     });
// //   }
// // };

// export const addCartItems = async (req, res) => {
//   try {
//     const id = req.params.userID;
//     const { product, size, quantity, price, DiscountedPrice } = req.body;

//     const getUser = await userModuel.findOne({ _id: id });

//     if (!getUser) {
//       return res.status(400).json({ Message: "Please login" });
//     }

//     let getUserCart = await cartModel.findOne({ user: id });

//     // If the user doesn't have a cart, create one
//     if (!getUserCart) {
//       const addNewCart = new cartModel({
//         user: id,
//       });
//       getUserCart = await addNewCart.save();
//     }

//     const addCartItems = new cartItemModel({
//       cart: getUserCart._id, // Set the cart field to the ID of the user's cart
//       product,
//       size,
//       quantity,
//       price,
//       DiscountedPrice,
//       user: id,
//     });

//     const savedCartItem = await addCartItems.save();

//     if (savedCartItem) {
//       return res.status(200).json({
//         Data: savedCartItem,
//         Message: "Cart Item added successfully",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };


// export const updateQuantity = async (req, res) => {
//   try {
//     const id = req.params.cartItemsID;

//     const { updateTypeRequest } = req.query;

//     // console.log(updateTypeRequest,"Test");
//     const getcartItems = await cartItemModel.findOne({ _id: id });
//     // console.log(getcartItems,"Test");

//     if (!getcartItems) {
//       return res.status(404).json({
//         Message: "CartItem not found",
//       });
//     }

//     let quantity = getcartItems.quantity;
//     let price = getcartItems.price;

//     if (updateTypeRequest === "increment") {
//       if (quantity >= 10) {
//         return res.status(200).json({ Message: "Maximum Order Reached" });
//       } else {
//         quantity += 1;
//         price = price * quantity;
//       }
//     }

//     if (updateTypeRequest === "decrement") {
//       if (quantity <= 1) {
//         let removeQuantity = await cartItemModel.deleteOne({ _id: id });
//         if (removeQuantity.acknowledged) {
//           return res.status(200).json({ Message: "Cart Item Removed" });
//         }
//       } else {
//         quantity -= 1;
//         price = price * quantity;
//       }
//     }

//     const updateFields = {
//       quantity,
//       price,
//     };
//     let updatedCartItem = await cartItemModel.findOneAndUpdate(
//       {
//         _id: id,
//       },
//       updateFields,
//       { new: true }
//     );

//       return res.status(200).json({
//         Data: updatedCartItem,
//         message: "updated",
//       });
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };

// export const deleteCartItems = async (req, res) => {
//   try {
//     const id = req.params.cartItemsID;

//     const deleteCartItem = await cartItemModel.deleteOne({ _id: id });

//     if (deleteCartItem.acknowledged) {
//       return res.status(200).json({
//         Data: deleteCartItem,
//         Message: "Address Deleted Sucessfully",
//         result: deleteCartItem.length,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };
