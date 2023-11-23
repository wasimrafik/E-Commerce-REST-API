import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8001");
//     // console.log(response);
//     const dataAll = await response.json();
//     const data = dataAll.Data;
//     resolve({ data });
//   });
// }

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProducts",
  async ( ) => {
    try {
      const response = await axios.get("http://localhost:8001/product/getProduct");
      console.log(response.data);  
      return response.data.Data
    } catch (error) {
      return (error)
    }
  }
)

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProducts",
  async (productID) => {
    try {
    const response = await axios.get(`http://localhost:8001/product/getSingleProduct/${productID}`)  
    return response.data.Data;
    } catch (error) {
      return (error)
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
