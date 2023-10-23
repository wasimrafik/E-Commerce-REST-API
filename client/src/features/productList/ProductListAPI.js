export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8001/product/getProduct");
    // console.log(response);
    const dataAll = await response.json();
    const data = dataAll.Data;
    resolve({ data });
  });
}
