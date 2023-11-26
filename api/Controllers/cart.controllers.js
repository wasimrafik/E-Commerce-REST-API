import cartModel from "../Models/cart.model";

export const getCart = async (req, res) => {
  try {
    const id = req.params.userID;

      const getUserCart = await cartModel.find({ user: id }).populate({
        path: 'products',
        model: 'products',
      });
      // .populate("products", "name price imageUrl");

    if (getUserCart) {
      return res.status(200).json({
        Data: getUserCart,
        Message: "UserCart Get Sucessfully",
        result: getUserCart.length,
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
    const id = req.params.userID;
    const { products, size, quantity, color } = req.body;

    const addCartItems = new cartModel({
      user: id,
      products,
      size,
      quantity,
      color,
    });

    const savedCartItem = await addCartItems.save();

    if (savedCartItem) {
      return res.status(200).json({
        Data: savedCartItem,
        Message: "Cart Item added successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const id = req.params.cartID;

    const { updateTypeRequest } = req.query;

    // console.log(updateTypeRequest,"Test");
    const getcart = await cartModel.findOne({ _id: id });
    // console.log(getcartItems,"Test");

    if (!getcartItems) {
      return res.status(404).json({
        Message: "CartItem not found",
      });
    }

    let quantity = getcart.quantity;
    let price = getcart.price;

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
          return res.status(200).json({ Message: "Cart Item Removed" });
        }
      } else {
        quantity -= 1;
        price = price * quantity;
      }
    }

    const updateFields = {
      quantity,
      price,
    };
    let updatedCartItem = await cartModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateFields,
      { new: true }
    );

    return res.status(200).json({
      Data: updatedCartItem,
      message: "updated",
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const id = req.params.cartID;

    const deleteCartItem = await cartModel.deleteOne({ _id: id });

    if (deleteCartItem.acknowledged) {
      return res.status(200).json({
        Data: deleteCartItem,
        Message: "Address Deleted Sucessfully",
        result: deleteCartItem.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
