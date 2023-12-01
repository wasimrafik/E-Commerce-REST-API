import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "userProfile",
  async (userID) => {
    console.log(userID);
    try {
      const response = await axios.get(`/user/getSingleUser/${userID}`);

      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);


export const updateUserProfile = createAsyncThunk(
    "updateUser",
    async ({userIDData, data}) => {
        console.log({userIDData, data});
        try {
            const response = await axios.put(`/user/updateUser/${userIDData}`, data);
            console.log(response);
            return response.data
        } catch (error) {
            return error.message
        }
    }
);