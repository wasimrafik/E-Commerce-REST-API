import adressesModel from "../Models/adresses.model";
import userModuel from "../Models/user.moduel";

export const getaddress = async (req, res) => {
  try {
    const id = req.params.userID;

    const getaddress = await adressesModel.find({user: id});

    if (getaddress) {
      return res.status(200).json({
        Data: getaddress,
        Message: "Address Details Get Sucessfully",
        result: getaddress.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addaddress = async (req, res) => {
  try {
    const id = req.params.userID;

    const { fullName, streetAddress, city, state, pincode, email, country } = req.body;

    const getUser = await userModuel.findOne({ _id: id });

    if (!getUser) {
      return "please Login";
    }
    console.log(getUser);

    const addAddress = new adressesModel({
      user: getUser._id,
      fullName,
      streetAddress,
      city,
      state,
      pincode,
      email,
      country,
    });

    await addAddress.save();

    console.log(addAddress);

    if (addAddress) {
      return res.status(200).json({
        Data: addAddress,
        Message: "Address Details sucessfully Added ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const Updateaddress = async (req, res) => {
  

  try {
    const id = req.params.addressesID;

    const { fullName, streetAddress, city, state, pincode, email,country } = req.body;

    const existingAddress = await adressesModel.findOne({ _id: id });

    if (!existingAddress) {
      return res.status(404).json({
        Message: "Please add the address ",
      });
    }

    const updateFields = {
      fullName,
      streetAddress,
      city,
      state,
      pincode,
      email,
      country,
    };

    const updateAddress = await adressesModel.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    if (updateAddress.acknowledged) {
      return res.status(201).json({
        data: updateAddress,
        Message: "Address Updated Successfully",
      });
    } else {
      return res.status(200).json({
        Message: "No changes were made to the document.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};


export const deleteaddress = async (req, res) => {
  try {
    const id = req.params.addressesID;

    const deleteadresses = await adressesModel.deleteOne({ _id: id });

    if (deleteadresses.acknowledged) {
      return res.status(200).json({
        Data: deleteadresses,
        Message: "Address Deleted Sucessfully",
        result: deleteadresses.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
