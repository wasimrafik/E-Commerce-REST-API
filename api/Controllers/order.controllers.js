import orderModel from "../Models/order.model";

export const getSingleOrder = async (req, res) => {
  try {
    const userID = req.params.userID;

    const getOrderById = await orderModel.find({ user: userID }).populate({
      path: "cart",
      model: "cart",
    });
    console.log(getOrderById);

    if (getOrderById) {
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
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

// export const getOrderByUser = async (req, res) => {
//   try {
//     const userID = req.params.userID;

//     const getOrderById = await orderModel.find({ user: userID }) // Assuming 'user' is a reference to the 'users' collection
//       .populate({
//         path: 'products',
//         model: 'products', 
//       })
//       // .populate({
//       //   path: 'cart',
//       //   model: 'cart',
//       // })
//     console.log(getOrderById);

//     if (getOrderById) {
//       return res.status(200).json({
//         Data: getOrderById,
//         Message: "Order Details Get Successfully",
//         result: getOrderById.length,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };

// aggrigate

export const getOrderByUser = async (req, res) => {
  try {
    const id = req.params.userID;
    console.log(id);
    const getOrderById = await orderModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "carts",
          localField: "cart",
          foreignField: "_id",
          as: "carts",
        },
      },
      {
        $unwind: "$carts",
      },
      {$match: {user: id}}
    ]);

    console.log(getOrderById);
    if (getOrderById) {
      return res.status(200).json({
        Data: getOrderById,
        Message: "Order Details Get Successfully",
        result: getOrderById.length,
      });
    } else {
      return res.status(404).json({
        Message: "No orders found for the specified user.",
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
    const userID = req.params.userID;
    const {
      shippingAddress,
      paymentMethod,
      totalPrice,
      totalItem,
      products,
      cart,
    } = req.body;

    const getUser = await userModel.findOne({ _id: userID });

    if (!getUser) {
      return res.status(400).json({ Message: "No User found, Please log in." });
    }

    const addOrderDetails = new orderModel({
      shippingAddress,
      totalPrice,
      totalItem,
      user: userID,
      cart,
      products,
      paymentDetails: {
        paymentMethod,
      },
    });

    await addOrderDetails.save();

    return res.status(201).json({
      orderID: addOrderDetails.orderID,
      Data: addOrderDetails,
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
      shippingAddress,
      totalPrice,
      orderStatus,
      totalItem,
      products,
      paymentMethod,
      transactionID,
      paymentID,
      paymentStatus,
    } = req.body;

    const updateFields = {
      paymentDetails: {
        paymentMethod,
        transactionID,
        paymentID,
        paymentStatus,
      },
      shippingAddress,
      products,
      totalPrice,
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
