import orderItemsModel from "../Models/orderItems.model";
import productModel from "../Models/product.model";
import userModuel from "../Models/user.moduel";

export const getOrderItems = async (req, res) => {
  try {
    const id = req.params.userID;

    const getUser = await userModuel.findOne({ _id: id });

    if (!getUser) {
      return res.status(404).json({
        Message: "User not found with the provided userID.",
      });
    }

    const getOrderItems = await orderItemsModel.find({ user: id });

    if (getOrderItems) {
      return res.status(200).json({
        Data: getOrderItems,
        Message: "Order Items Retrieved Successfully",
        result: getOrderItems.length,
      });
    } else {
      return res.status(200).json({
        Data: [],
        Message: "No order items found for the user.",
        result: 0,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addOrderItems = async (req, res) => {
  try {
    const id = req.params.userID;
    const { user, product, size, quantity, price, discountedPrice } = req.body;

    console.log(user, product);

    const getUser = await userModuel.findOne({ _id: id });

    if (!getUser) {
      return "please Login";
    }

    const addorderDetails = new orderItemsModel({
      user: id,
      product,
      size,
      quantity,
      price,
      discountedPrice,
    });

    await addorderDetails.save();

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

export const UpdateOrderItems = async (req, res) => {
  

  try {
    const id = req.params.orderItemsID;
    
    const { size, quantity, price, discountedPrice } = req.body;

    const updateorderItems = await orderItemsModel.updateOne(
      { _id: id },
      {
        $set: {
          size,
          quantity,
          price,
          discountedPrice,
        },
      }
    );
    if (updateorderItems.acknowledged) {
      return res.status(201).json({
        Data: updateorderItems,
        Message: "Order Updated Sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteOrderItems = async (req, res) => {
  try {
    const id = req.params.orderItemsID;

    const deleteOrderItems = await orderItemsModel.deleteOne({ _id: id });

    if (deleteOrderItems.acknowledged) {
      return res.status(200).json({
        Data: deleteOrderItems,
        Message: "Order Deleted Sucessfully",
        result: deleteOrderItems.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
