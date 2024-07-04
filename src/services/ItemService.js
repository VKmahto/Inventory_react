import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/items";

export const listitem = () =>  axios.get(REST_API_BASE_URL);

export const createItem = (item) => axios.post(REST_API_BASE_URL,item);

export const updateItem = (itemId, itemData) => axios.put(`${REST_API_BASE_URL}/${itemId}`, itemData);

export const deleteItem = (itemId) => axios.delete(REST_API_BASE_URL+'/'+itemId);


export const getItemDetails = (itemId) => axios.get(`${REST_API_BASE_URL}/${itemId}`);

// class ItemServices{
//     getItemById(ItemId){
//         return axios.get(REST_API_BASE_URL+'/'+ItemId);
//     }
// }

// export default new ItemServices();
