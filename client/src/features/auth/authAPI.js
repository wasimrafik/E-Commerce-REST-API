import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/user/signUp",
        userData
      );
      resolve({ response });
    } catch (error) {
      resolve({ error: error.response.data });
    }
  });
}

export const getLoginUserAsync = createAsyncThunk(
  "getLoginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8001/user/logIn",
        loginData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
