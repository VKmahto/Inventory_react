import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSale } from '../services/SaleMstrService';
import { listitem, getItemDetails } from '../services/ItemService';
import { createSaleDtl } from '../services/SaleDtlServie';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const AddSaleComponents = () => {
    const [customer_name, setCustomerName] = useState('');
    const [mobile_no, setMobileNo] = useState('');
    const [itemList, setItemList] = useState([]);
    const [itemDetails, setItemDetails] = useState([{ item_id: '', price: '', quantity: '', amount: 0 }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [availableQuantities, setAvailableQuantities] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(''); 
    const [selectedItemIds,setSelectedItemIds] = useState([]);
    const [quantity, setQuantity] = useState(''); // Added quantity state

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        customer_name: '',
        mobile_no: '',
        quantity: '',
    });

    const countQuantity = (itemId) => {
        const REST_API_BASE_URLs_FOR_QTY = `http://localhost:8080/api/purchaseDtl/totalPurchaseSaleQuantity/${itemId}`;

        return axios.get(REST_API_BASE_URLs_FOR_QTY)
            .then(response => {
                setAvailableQuantities(prevState => ({
                    ...prevState,
                    [itemId]: response.data 
                }));
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching total quantity:', error);
                return 0; // Return 0 in case of an error
            });
    };

    useEffect(() => {
        listitem()
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setItemList(response.data);
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching item list:', error);
            });
    }, []);

    useEffect(() => {
        calculateTotalAmount();
    }, [itemDetails]);

    const addItemDetail = () => {
        setItemDetails([...itemDetails, { item_id: '', price: '', quantity: '', amount: 0 }]);
    };

    const handleItemChange = async (index, e) => {
        const { name, value } = e.target;
        const list = [...itemDetails];
        list[index][name] = value;

        if (name === 'item_id') {
            if (selectedItemIds.includes(value)) {
                // If item ID is already selected, show error message
                setAlertMessage('Item ID already selected. Please select another item.');
                setShowAlert(true);
            } else {
                try {
                    const selectedItem = await getItemDetails(value);
                    if (selectedItem && selectedItem.data) {
                        list[index]['price'] = selectedItem.data.price;
                    }
                    countQuantity(value).then(availableQuantity => {
                        if (parseInt(value.quantity) > availableQuantity) {
                            setAlertMessage('Entered quantity is greater than available quantity');
                            setShowAlert(true);
                        } else {
                            list[index]['available_quantity'] = availableQuantity;
                            setItemDetails(list);
                            setSelectedItemIds(prevState => [...prevState, value]); // Add selected item ID to the list
                        }
                    });
                } catch (error) {
                    console.error('Error fetching item details:', error);
                }
            }
        } else {
            setItemDetails(list);
            calculateTotalAmount();
        }
    };
    
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        itemDetails.forEach(item => {
            totalAmount += parseFloat(item.price) * parseFloat(item.quantity);
        });
        setTotalAmount(totalAmount);
    };

    function saveSale(e) {
        e.preventDefault();
        if (validateForm()) {
            let isValidQuantity = true; // Flag to check if all quantities are valid

            // Check if any quantity is greater than available quantity
            itemDetails.forEach(item => {
                if (parseInt(item.quantity) > availableQuantities[item.item_id]) {
                    setAlertMessage('Entered quantity is greater than available quantity');
                    setShowAlert(true);
                    isValidQuantity = false;
                }
            });

            if (isValidQuantity) {
                const listSale = {
                    customer_name,
                    mobile_no
                };

                // Create sale first
                createSale(listSale)
                    .then((response) => {
                        const listSaleId = response.data.id;
                        console.log("listSaleId: " + listSaleId);

                        itemDetails.forEach(item => {
                            const selectedItem = itemList.find(s => s.id === parseInt(item.item_id));
                            const saleDtl = {
                                price: item.price,
                                qty: item.quantity,
                                amount: item.price * item.quantity,
                                item: {
                                    id: parseInt(item.item_id)
                                },
                                saleMstr: {
                                    id: listSaleId
                                }
                            };

                            // Create sale Details
                            createSaleDtl(saleDtl)
                                .then((response) => {
                                    const saledetails = response.data.id;
                                    console.log("saledetailssss : " + response.data);
                                    console.log("saledetails :::" + saledetails);
                                })
                                .catch(error => {
                                    console.error('Error creating sale details:', error);
                                });
                        });

                        navigate('/sale');
                    })
                    .catch(error => {
                        console.error('Error creating purchase:', error);
                    });
            }
        }
    }

   
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!customer_name.trim()) {
            errorsCopy.customer_name = 'Customer Name is required';
            valid = false;
        } else {
            errorsCopy.customer_name = '';
        }

        if (!mobile_no.trim()) {
            errorsCopy.mobile_no = 'Mobile No is required';
            valid = false;
        } else {
            errorsCopy.mobile_no = '';
        }
        if (!quantity.trim()) {
            errorsCopy.quantity = 'Quantity No is required';
            valid = false;
        } else {
            errorsCopy.quantity = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saleback() {
        navigate('/sale');
    }

    const handleMobileChange = (e) => {
        const value = e.target.value;
        const truncatedValue = value.slice(0, 10); // Limit to 10 digits
        setMobileNo(truncatedValue);
    };
    
    return (
        <div className='container'>
            <br />
            <button type="button" className="btn btn-primary mb-2" onClick={saleback}>
                Back
            </button>
             {showAlert && <Alert severity="error" onClose={() => setShowAlert(false)}>{alertMessage}</Alert>}
            <br />
            <div className='row'>
                <div className='card col-md-12'>
                    <h2 className='text-center'>Add Sale</h2>
                    <div className='card-body'>
                        <form onSubmit={saveSale}>
                            <div id='formfields'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group"><label><strong>Customer Name</strong></label></div>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Customer Name'
                                                    name='customer_name'
                                                    value={customer_name}
                                                    className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                />
                                                {errors.customer_name && <div className="invalid-feedback">{errors.customer_name}</div>}
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group"><label><strong>Mobile No</strong></label></div>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Mobile No'
                                                    name='mobile_no'
                                                    value={mobile_no}
                                                    className={`form-control ${errors.mobile_no ? 'is-invalid' : ''}`}
                                                    onChange={handleMobileChange}
                                                />
                                                {errors.mobile_no && <div className="invalid-feedback">{errors.mobile_no}</div>}
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    {itemDetails.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <div className="form-group"><label><strong>Item Name</strong></label></div>
                                                        <select
                                                            className={`form-control`}
                                                            name="item_id"
                                                            value={item.item_id}
                                                            onChange={(e) => {
                                                                handleItemChange(index, e);
                                                            }}
                                                        >
                                                            <option value="">Select Item</option>
                                                            {itemList.map(item => (
                                                                <option key={item.id} value={item.id}>{item.item_name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <div className="form-group"><label><strong>Price</strong></label></div>
                                                        <input
                                                            type="text"
                                                            placeholder='Enter Price'
                                                            name='price'
                                                            value={item.price}
                                                            className={`form-control`}
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="form-group"><label><strong>Available Quantity</strong></label></div>
                                                        <input
                                                                type="text"
                                                                readOnly
                                                                name='available_quantity'
                                                                value={availableQuantities[item.item_id] || ''} // Access available quantity from state based on item ID
                                                                className={`form-control`}
                                                            />
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <div className="form-group"><label><strong>Quantity</strong></label></div>
                                                        <input
                                                            type="text"
                                                            placeholder='Enter Quantity'
                                                            name='quantity'
                                                            value={item.quantity}
                                                            className={`form-control`}
                                                            onChange={(e) =>{ handleItemChange(index, e);
                                                                            setQuantity(e.target.value);
                                                                    }}
                                                            // className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                                                            // onChange={(e) => setQuantity(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-group"><label><strong>Amount</strong></label></div>
                                                        <input
                                                            type="text"
                                                            placeholder='Enter Amount'
                                                            name='amount'
                                                            value={item.price * item.quantity}
                                                            className={`form-control`}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col-12" align="center">
                                            <div className="form-group">
                                                <button type="button" className='btn btn-primary' onClick={addItemDetail}>Add Item</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            </div>
           
        </div>
    );
}

export default AddSaleComponents;
