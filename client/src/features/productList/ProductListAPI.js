export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8001/product/getProduct");
    // console.log(response);
    const dataAll = await response.json();
    const data = dataAll.Data;
    resolve({ data });
  });
}


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
