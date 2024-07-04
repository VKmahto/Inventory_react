import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPurchase } from '../services/PurchaseService';
import { listsupplier } from '../services/SupplierService';
import { listitem, getItemDetails } from '../services/ItemService';
import { createPurchaseDtl } from '../services/PurchaseDtlService';

const AddPurchaseComponents = () => {
    const [invoice_no, setInvoiceNo] = useState('');
    const [invoice_date, setInvoiceDate] = useState('');
    const [supplier_id, setSupplierId] = useState('');
    const [supplier_name, setSupplier] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [itemDetails, setItemDetails] = useState([{ item_id: '', rate: '', quantity: '', amount: 0 }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        invoice_no: '',
        invoice_date: '',
        supplier_id: '',
    });

    useEffect(() => {
        listsupplier()
            .then((response) => {
                setSupplier(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        listitem()
            .then((response) => {
                setItemList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        calculateTotalAmount();
    }, [itemDetails]);

    const addItemDetail = () => {
        setItemDetails([...itemDetails, { item_id: '', rate: '', quantity: '', amount: 0 }]);
    };
 
    const handleItemChange = async (index, e) => {
        const { name, value } = e.target;
        const list = [...itemDetails];
        list[index][name] = value;
    
        if (name === 'item_id') {
            try {
                const selectedItem = await getItemDetails(value); // Fetch item details asynchronously
                if (selectedItem && selectedItem.data) {
                    list[index]['rate'] = selectedItem.data.rate; // Update the rate in the list
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
    
        setItemDetails(list);
    };

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        itemDetails.forEach(item => {
            totalAmount += parseFloat(item.rate) * parseFloat(item.quantity);
        });
        setTotalAmount(totalAmount);
    };

    function savePurchase(e) {
        e.preventDefault();
        if (validateForm()) {
            const selectedSupplier = supplier_name.find(s => s.id === parseInt(supplier_id));
    
            const purchase = {
                invoice_no,
                invoice_date,
                supplier_name: selectedSupplier
            };
    
            // Create purchase first
            createPurchase(purchase)
                .then((response) => {
                    const purchaseId = response.data.id;
                    console.log("purchase_id" + purchaseId)

                    itemDetails.forEach(item => {
                        const selectedItem = itemList.find(s => s.id === parseInt(item.item_id));
                        console.log("Item : " + selectedItem.id)
                        console.log("selectedItem :" +selectedItem )
                        console.log("Quantity : " + item.quantity)
                        console.log("rate : " +item.rate)
                        console.log("Amount : "+ item.rate * item.quantity)
                        console.log("Purchase : "+ purchaseId)

                        const purchasedtl = {
                            // item : selectedItem ? selectedItem.id : null, 
                            // quantity: item.quantity,
                            // rate: item.rate,
                            // amount: item.rate * item.quantity,
                            // purchaseMstr: purchaseId 
                           
                            // item : 1,
                            // quantity : 2,
                            // rate: 100,
                            // amount: 200,
                            // purchaseMstr: 88 

                            rate: item.rate,
                            quantity: item.quantity,
                            amount: item.rate * item.quantity,
                            item: {
                                id: parseInt(item.item_id)
                            },
                            purchaseMstr: {
                                id: purchaseId
                            }
                        };
                        
                        console.log("asdfghjkertyuidfg"+purchasedtl)
                        // Create Purchase Details
                        createPurchaseDtl(purchasedtl)
                            .then((response) => {
                                const purchasedetails = response.data.id;
                                console.log( "purchasedetailssss : "+response.data);
                                console.log( "purchasedetails :::" + purchasedetails);
                            })
                            .catch(error => {
                                console.error('Error creating purchase details:', error);
                            });
                    });
    
                    navigate('/purchase');
                })
                .catch(error => {
                    console.error('Error creating purchase:', error);
                });
        }
    }
    

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!invoice_no.trim()) {
            errorsCopy.invoice_no = 'Invoice No is required';
            valid = false;
        } else {
            errorsCopy.invoice_no = '';
        }

        if (!invoice_date.trim()) {
            errorsCopy.invoice_date = 'Invoice Date is required';
            valid = false;
        } else {
            errorsCopy.invoice_date = '';
        }

        if (!supplier_id.trim()) {
            errorsCopy.supplier_id = 'Supplier is required';
            valid = false;
        } else {
            errorsCopy.supplier_id = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function purcaseback(){
        navigate('/purchase')
    }

    return (
        <div className='container'>
            <br />
            <button type="button" className="btn btn-primary mb-2" onClick={purcaseback}>
                Back
            </button>
            <div className='row'>
                <div className='card col-md-12'>
                    <h2 className='text-center'>Add Purchase</h2>
                    <div className='card-body'>
                        <form onSubmit={savePurchase}>
                            <div id='formfields'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="form-group"><label><strong>Invoice No</strong></label></div>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Invoice Number'
                                                    name='invoice_no'
                                                    value={invoice_no}
                                                    className={`form-control ${errors.invoice_no ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                                />
                                                {errors.invoice_no && <div className="invalid-feedback">{errors.invoice_no}</div>}
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group"><label><strong>Invoice date</strong></label></div>
                                                <input
                                                    type="date"
                                                    placeholder='Enter Invoice date'
                                                    name='invoice_date'
                                                    value={invoice_date}
                                                    className={`form-control ${errors.invoice_date ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                                />
                                                {errors.invoice_date && <div className="invalid-feedback">{errors.invoice_date}</div>}
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group"><label><strong>Supplier Name</strong></label></div>
                                                <select
                                                    className={`form-control ${errors.supplier_id ? 'is-invalid' : ''}`}
                                                    value={supplier_id}
                                                    onChange={(e) => setSupplierId(e.target.value)}
                                                >
                                                    <option value="">Select Supplier</option>
                                                    {supplier_name.map(supplierItem => (
                                                        <option key={supplierItem.id} value={supplierItem.id}>{supplierItem.supplier_name}</option>
                                                    ))}
                                                </select>
                                                {errors.supplier_id && <div className="invalid-feedback">{errors.supplier_id}</div>}
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
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            >
                                                                <option value="">Select Item</option>
                                                                {itemList.map(item => (
                                                                    <option key={item.id} value={item.id}>{item.item_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        {/* <div className="col-lg-3">
                                                            <div className="form-group"><label><strong>Item Code</strong></label></div>
                                                            <input
                                                                type="text"
                                                                placeholder='Enter Item Code'
                                                                name='item_code'
                                                                value={item.item_code}
                                                                className={`form-control`}
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            />
                                                        </div> */}
                                                        <div className="col-lg-3">
                                                            <div className="form-group"><label><strong>Price</strong></label></div>
                                                            <input
                                                                type="text"
                                                                placeholder='Enter Price'
                                                                name='rate'
                                                                value={item.rate}
                                                                className={`form-control`}
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="form-group"><label><strong>Quantity</strong></label></div>
                                                            <input
                                                                type="text"
                                                                placeholder='Enter Quantity'
                                                                name='quantity'
                                                                value={item.quantity}
                                                                className={`form-control`}
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="form-group"><label><strong>Amount</strong></label></div>
                                                            <input
                                                                type="text"
                                                                placeholder='Enter Amount'
                                                                name='amount'
                                                                value={item.rate * item.quantity}
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
};

export default AddPurchaseComponents;
