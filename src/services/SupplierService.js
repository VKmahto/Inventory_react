import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/supplier_mstr";

export const listsupplier = () =>  axios.get(REST_API_BASE_URL);

export const createSupplier = (supplier) => axios.post(REST_API_BASE_URL,supplier);

export const updateSupplier = (supplierId, supplierData) => axios.put(`${REST_API_BASE_URL}/${supplierId}`, supplierData);

export const deleteSupplier = (itemId) => axios.delete(REST_API_BASE_URL+'/'+itemId);


