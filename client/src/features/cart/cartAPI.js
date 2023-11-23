import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (newItem) => {
    console.log(newItem);
    try {
      const response = await axios.post("cart/addCartItems/"+newItem.userID, newItem);
      console.log(newItem);
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const getCartAsync = createAsyncThunk(
  "cart/getCart",
  async (userID) => {
    console.log(userID);
    try {
      const response = await axios.get("cart/getCart/"+userID);
      // console.log(userID);
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (cartID) => {
    try {
      const response = await axios.delete(`cart/deleteCart/${cartID}`);
      console.log(response);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
);