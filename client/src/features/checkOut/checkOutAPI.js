import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllAddressAsync = createAsyncThunk(
  "fetchAddress",
  async ({userID} ) => {
    try {
      const response = await axios.get(`/address/getAddress/${userID}`);
      console.log(response.data.Data);  
      return response.data.Data
    } catch (error) {
      return (error)
    }
  }
)


export const addAddressAsync = createAsyncThunk(
  "addAddress",
  async ({ userID, data }, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(`/address/addAddress/${userID}`, data);
      console.log(response.data);  
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)


export const deleteAddressAsync = createAsyncThunk(
  'deleteAddress',
  async (addressID) => {
    try {
      const response = await axios.delete(`/address/deleteAddress/${addressID}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);


export const addOrder = createAsyncThunk(
  "addOrder",
  async ({userID, data}) => {
    console.log(data);
    try {
    const response = await axios.post(`/order/addOrder/${userID}`, data) 
    console.log(response.data); 
    return response.data.Data;
    } catch (error) {
      return (error)
    }
  }
)

export const findOrderAsync = createAsyncThunk(
  'findOrder',
  async (userID) => {
    console.log(userID);
      try {
        const response = axios.get(`/order/getSingleOrder/${userID}`)
        .then((res) => {
          console.log(res.data.Data)
        })
        console.log(response);
        return response
      } catch (error) {
        return error.message
      }
  }
)
// export function fetchProductsByFilter(filter) {

//   let queryFilter = ''
//   for(let key in filter){
//     queryFilter += `${key}=${filter[key]}&`
//   }
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8001/product/getProduct?"+queryFilter);
//     // console.log(response);
//     const dataAll = await response.json();
//     const data = dataAll.Data;
//     resolve({ data });
//   });
// }
