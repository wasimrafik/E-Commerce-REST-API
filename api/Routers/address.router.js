import express from "express";

import {
  Updateaddress,
  addaddress,
  deleteaddress,
  getaddress,
} from "../Controllers/address.controllers";

const addressRouter = express.Router();

addressRouter.get("/getAddress/:userID", getaddress);
addressRouter.post("/addAddress/:userID", addaddress);
addressRouter.put("/updateAddress/:addressesID", Updateaddress);
addressRouter.delete("/deleteAddress/:addressesID", deleteaddress);

export default addressRouter;
