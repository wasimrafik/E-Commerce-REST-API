import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createUserAsync = createAsyncThunk(
  "createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/user/signUp",
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLoginUserAsync = createAsyncThunk(
  "getLoginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/user/logIn",
        loginData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  "getUser",
  async (getUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/user/getUser",
        getUser
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
