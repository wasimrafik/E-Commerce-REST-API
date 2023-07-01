import orderModel from "../Models/order.model";
import productModel from "../Models/product.model";
import cartModel from "../Models/cart.model";

export const getOrder = async (req, res) => {
  try {
    const id = req.params.userID;

    const getOrderDetails = await orderModel.findOne({ _id: id });

    if (getOrderDetails) {
      return res.status(200).json({
        Data: getOrderDetails,
        Message: "Order Details Get Sucessfully",
        result: getOrderDetails.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { userID, cartID } = req.body;

    console.log(userID, cartID);

    const getCart = await cartModel.findOne({ _id: cartID });

    const addorderDetails = new orderModel({
      UserID: userID,
      ProductID: getCart.productID,
      Quantity: getCart.quantity,
      Price: getCart.price,
      Image: getCart.image,
    });

    addorderDetails.save();

    if (addorderDetails) {
      return res.status(200).json({
        Data: addorderDetails,
        Message: "order Details sucessfully got ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
