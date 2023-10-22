import cartModel from "../Models/cart.model";
import productModel from "../Models/product.model";

export const getCart = async (req, res) => {
  try {
    const id = req.params.cartID;

    const getCart = await cartModel.find({ _id: id });

    if (getCart) {
      return res.status(200).json({
        Data: getCart,
        Message: "Fetch Cart Item",
        result: getCart.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    const productData = await productModel.findOne({ _id: productID });

    console.log(productData);
    const existsCartData = await cartModel.findOne({
      productID: productID,
      userID: userID,
    });
    console.log(userID, productID);

    if (existsCartData) {
      let quantity = existsCartData.quantity + 1;
      let price = productData.price * quantity;

      console.log(quantity, "quan");

      let updatedItem = await cartModel.updateOne(
        {
          _id: existsCartData._id,
        },
        {
          $set: {
            quantity: quantity,
            price: price,
          },
        }
      );

      if (updatedItem.acknowledged) {
        return res.status(200).json({
          message: "updated",
        });
      }
    }
    const cartData = new cartModel({
      userID: userID,
      productID: productID,
      name: productData.Name,
      price: productData.price,
      quantity: 1,
      image: productData.Thumbnail,
    });
    cartData.save();

    console.log(cartData, "cartDAta");
    if (cartData) {
      return res.status(201).json({ Data: cartData, Message: "Cart Data" });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const id = req.params.cartID;

    let deleteCartItems = await cartModel.deleteOne({ _id: id });

    if (deleteCartItems.acknowledged) {
      return res.status(200).json({
        data: deleteCartItems,
        message: "Cart Deleted Sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Data: deleteCart,
      Message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const id = req.params.cartID;
    const { productID } = req.body;
    const { updateTypeRequest } = req.query;

    const cartData = await cartModel.findOne({ _id: id });
    const productData = await productModel.findOne({ _id: productID });

    if (!cartData) {
      return res.status(404).json({
        Message: "Cart item not found",
      });
    }

    if (!productData) {
      return res.status(404).json({
        Message: "Product not found",
      });
    }

    let quantity = cartData.quantity;
    let price = productData.price;

    if (updateTypeRequest === "increment") {
      if (quantity >= 10) {
        return res.status(200).json({ Message: "Maximum Order Reached" });
      } else {
        quantity += 1;
        price = price * quantity;
      }
    }

    if (updateTypeRequest === "decrement") {
      if (quantity <= 1) {
        let removeQuantity = await cartModel.deleteOne({ _id: id });
        if (removeQuantity.acknowledged) {
          return res.status(200).json({Message: "Cart Item Removed"});
        }
      } else {
        quantity -= 1;
        price = price * quantity;
      }
    }

    let updatedItem = await cartModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          quantity: quantity,
          price: price,
        },
      }
    );

    if (updatedItem.acknowledged) {
      return res.status(200).json({
        message: "updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
