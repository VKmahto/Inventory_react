import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/saleDtl";

export const listSaleDtl = () =>  axios.get(REST_API_BASE_URL);

export const createSaleDtl = (saleDtl) => axios.post(REST_API_BASE_URL,saleDtl);

const REST_API_BASE_URLs_FOR_sale_DTLS = "http://localhost:8080/api/saleDtl/SaleId";
    
export const listsaleeeeeeeeeDtl = (saleId) => axios.get(`${REST_API_BASE_URLs_FOR_sale_DTLS}/${saleId}`);
    
