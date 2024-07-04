import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/sale";

export const listSale = () =>  axios.get(REST_API_BASE_URL);

export const createSale = (salemstr) => axios.post(REST_API_BASE_URL,salemstr);
