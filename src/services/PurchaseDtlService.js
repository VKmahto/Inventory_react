    import axios from "axios";
    const REST_API_BASE_URLs = "http://localhost:8080/api/purchaseDtl";

    export const listpurchaseDtl = () =>  axios.get(REST_API_BASE_URLs);

    export const createPurchaseDtl = (purchasedtl) => axios.post(REST_API_BASE_URLs,purchasedtl);


    const REST_API_BASE_URLs_FOR_DTLS = "http://localhost:8080/api/purchaseDtl/Purchaseid";
    
    export const listpurchaseeeeeDtl = (purchaseId) => axios.get(`${REST_API_BASE_URLs_FOR_DTLS}/${purchaseId}`);
    

    