import React, { useState, useEffect } from 'react';
import { listitem } from '../services/ItemService';

const StockService = () => {
    const [itemList, setItemList] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [stockData, setStockData] = useState([]);
    const [errors, setErrors] = useState({
        item_name: '',
    });

    useEffect(() => {
        listitem()
        .then((response) => {
            setItemList(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleItemChange = (e) => {
        setSelectedItemId(e.target.value);
    };

    const fetchStockData = async () => {
        if (selectedItemId) {
            const REST_API_BASE_URLs_PURCHASE_QTY = `http://localhost:8080/api/purchaseDtl/totalQuantity/${selectedItemId}`;
            const REST_API_BASE_URLs_SALE_QTY = `http://localhost:8080/api/saleDtl/totalSaleQuantity/${selectedItemId}`;

            try {
                const purchaseResponse = await fetch(REST_API_BASE_URLs_PURCHASE_QTY);
                const saleResponse = await fetch(REST_API_BASE_URLs_SALE_QTY);

                if (!purchaseResponse.ok || !saleResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const purchaseQuantity = await purchaseResponse.json();
                const saleQuantity = await saleResponse.json();

                const totalQuantity = purchaseQuantity - saleQuantity;
                const newItem = {
                    itemId: selectedItemId,
                    purchaseQuantity: purchaseQuantity,
                    saleQuantity: saleQuantity,
                    totalQuantity: totalQuantity
                };

                setStockData([...stockData, newItem]);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        }
    };

    const saveSale = (e) => {
        e.preventDefault();
        fetchStockData();
    };

    const getItemName = (itemId) => {
        const selectedItem = itemList.find((item) => item.id === itemId);
        console.log("selectedItem :" + selectedItem);
        return selectedItem ? selectedItem.item_name : 'N/A';
    };

    return (
        <div className='container'>
           <br />
            <h2 className='text-center'>Stock</h2>
            <div className='card col-md-12'>
                <div className='card-body'>
                    <form onSubmit={saveSale}>
                        <div className="form-group">
                            <label>Select Item:</label>
                            <select
                                value={selectedItemId}
                                onChange={handleItemChange}
                                className={`form-control ${errors.item_name ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select an item</option>
                                {itemList.map(item => (
                                    <option key={item.id} value={item.id}>{item.item_name}</option>
                                ))}
                            </select>
                            {errors.item_name && <div className='invalid-feedback'>{errors.item_name}</div>}
                        </div>
                        <br />
                        <div className="col-12" align="center">
                            <div className="form-group">
                                <button type="submit" className='btn btn-success'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Display the fetched stock data in a table */}
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Purchase Quantity</th>
                        <th>Sale Quantity</th>
                        <th>Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((item, index) => (
                        <tr key={index}>
                              <td>{getItemName(item.itemId)}</td>
                            <td>{item.purchaseQuantity}</td>
                            <td>{item.saleQuantity}</td>
                            <td>{item.totalQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockService;
