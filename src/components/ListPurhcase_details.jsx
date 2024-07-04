import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { listitem } from '../services/ItemService';
import { listpurchaseeeeeDtl } from '../services/PurchaseDtlService';

const ListPurchase_details = () => {
    const [purchaseDetails, setPurchaseDetails] = useState([]);
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const { purchaseId } = useParams(); // Get purchaseId from URL parameters

    useEffect(() => {
        // Fetch purchase detail only if purchaseId is defined
        if (purchaseId) {
            listpurchaseeeeeDtl(purchaseId)
                .then((response) => {
                    setPurchaseDetails(response.data);
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
    }, [purchaseId]); // Trigger effect when purchaseId changes

    function baclPurchase() {
        navigate('/purchase');
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
                    {purchaseDetails.map((purchaseDetail) => (
                        <tr key={purchaseDetail.id}>
                            <td>{purchaseDetail.id}</td>
                            <td>{purchaseDetail.item ? getItemName(purchaseDetail.item.id) : 'N/A'}</td>
                            <td>{purchaseDetail.price}</td>
                            <td>{purchaseDetail.amount}</td>
                            <td>{purchaseDetail.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPurchase_details;
