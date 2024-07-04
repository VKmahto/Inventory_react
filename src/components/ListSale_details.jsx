import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { listitem } from '../services/ItemService';
import { listsaleeeeeeeeeDtl } from '../services/SaleDtlServie';
// import { listpurchaseeeeeDtl } from '../services/PurchaseDtlService';


const ListPurchase_details = () => {
    const [saleDetails, setSaleDetails] = useState([]);
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const { saleId } = useParams(); // Get purchaseId from URL parameters

    useEffect(() => {
        // Fetch purchase detail only if purchaseId is defined
        if (saleId) {
            listsaleeeeeeeeeDtl(saleId)
                .then((response) => {
                    setSaleDetails(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        // Fetch item details
        listitem()
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [saleId]); // Trigger effect when purchaseId changes

    function baclPurchase() {
        navigate('/sale');
    }

    const getItemName = (itemId) => {
        const selectedItem = item.find((s) => s.id === itemId);
        return selectedItem ? selectedItem.item_name : 'N/A';
    };

    return (
        <div className='container'>
            <br />
            <button type='button' className='btn btn-primary mb-2' onClick={baclPurchase}>Back</button>
            <h2 className='text-center'>List Of Purchase Details</h2>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {saleDetails.map((saleDetail) => (
                        <tr key={saleDetail.id}>
                            <td>{saleDetail.id}</td>
                            <td>{saleDetail.item ? getItemName(saleDetail.item.id) : 'N/A'}</td>
                            <td>{saleDetail.price}</td>
                            <td>{saleDetail.amount}</td>
                            <td>{saleDetail.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPurchase_details;
