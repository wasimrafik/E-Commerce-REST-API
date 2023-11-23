import orderModel from "../Models/order.model";
import orderItemsModel from "../Models/orderItems.model";
import addressModel from "../Models/adresses.model";
import userModel from "../Models/user.moduel";
import adressesModel from "../Models/adresses.model";

export const getOrder = async (req, res) => {
  try {
    const userID = req.params.userID;
    const getOrderDetails = await orderModel.aggregate([
      {
        $lookup: {
          from: "orderItems",
          localField: "orderItems",
          foreignField: "_id",
          as: "orderItems",
        },
      },
      { $unwind: "$orderItems" },
    ]);

    const getOrderById = await orderModel.find({ user: userID });
    console.log(getOrderById);

    if (getOrderById !== null) {
      return res.status(200).json({
        Data: getOrderById,
        Message: "Order Details Get Successfully",
        result: getOrderById.length,
      });
    } else {
      return res.status(200).json({
        Message: "Empty",
      });
    }
    console.log("test13");
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addOrder = async (req, res) => {
  try {
    const userId = req.params.userID;

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      transactionID,
      paymentID,
      paymentStatus,
      totalPrice,
      totalDiscountedPrice,
      discount,
      orderStatus,
      totalItem,
    } = req.body;

    let address;

    const getUser = await userModel.findOne({ _id: userId });

    if (!getUser) {
      return res.status(400).json({ Message: "No User found, Please log in." });
    }

    if (shippingAddress) {
      let isExist = await addressModel.findOne({ shippingAddress: id });
      address = isExist;
    } else {
      const { name, streetAddress, city, state, pincode, mobile } = req.body;

      const addAddress = new adressesModel({
        name,
        streetAddress,
        city,
        state,
        pincode,
        mobile,
      });

      await addAddress.save();

      address = addAddress._id;
    }

    console.log(address);

    const getOrderItems = await orderItemsModel.find({
      _id: { $in: orderItems },
    });

    if (getOrderItems.length !== orderItems.length) {
      return res.status(400).json({
        Message:
          "Some order items were not found. Please select valid order items.",
      });
    }

    const addorderDetails = new orderModel({
      user: userId,
      orderItems: getOrderItems.map((item) => item._id),
      shippingAddress: address,
      paymentDetails: {
        paymentMethod,
        transactionID,
        paymentID,
        paymentStatus,
      },
      totalPrice,
      totalDiscountedPrice,
      discount,
      orderStatus,
      totalItem,
    });

    await addorderDetails.save();

    return res.status(201).json({
      Data: addorderDetails,
      Message: "Order Details successfully added.",
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const UpdateOrder = async (req, res) => {
  const id = req.params.orderID;

  try {
    const {
      totalPrice,
      totalDiscountedPrice,
      discount,
      orderStatus,
      totalItem,
      transactionID,
      paymentID,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const updateFields = {
      paymentDetails: {
        paymentMethod,
        transactionID,
        paymentID,
        paymentStatus,
      },
      totalPrice,
      totalDiscountedPrice,
      discount,
      orderStatus,
      totalItem,
    };

    const updateorderDetails = await orderModel.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true } 
    );

    if (updateorderDetails) {
      return res.status(201).json({
        data: updateorderDetails,
        Message: "Order Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.orderID;

    const deleteOrder = await orderModel.deleteOne({ _id: id });

    if (deleteOrder.acknowledged) {
      return res.status(200).json({
        Data: deleteOrder,
        Message: "Order Deleted Sucessfully",
        result: deleteOrder.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
