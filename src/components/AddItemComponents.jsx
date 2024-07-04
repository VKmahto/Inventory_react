import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateItem } from '../services/ItemService'; // Import the updateItem function
import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8080/api/items";

const AddItemComponents = () => {
    const [item_name, setItemName] = useState('');
    const [rate , setPrice] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        item_name: '',
        rate: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`${REST_API_BASE_URL}/${id}`)
                .then(response => {
                    const { item_name, rate } = response.data;
                    setItemName(item_name);
                    setPrice(rate);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    function saveItem(e) {
        e.preventDefault();
        if(validateForm);
            const item = { item_name, rate };
            if (id) {
                updateItem(id, item)
                    .then(response => {
                        console.log("updateitem:" + response.data);
                        navigate('/item');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                axios.post(REST_API_BASE_URL, item)
                    .then(response => {
                        console.log("createitem:" + response.data);
                        navigate('/item');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        
    }
   
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (item_name.trim()) {
            errorsCopy.item_name = '';
        } else {
            errorsCopy.item_name = 'Item name is required';
            valid = false;
        }


        if (rate.trim()) {
            errorsCopy.rate = '';
        } else {
            errorsCopy.rate = 'Price is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    const title = () => {
        if (id) {
            return <h2 className='text-center'> Update Item </h2>;
        } else {
            return <h2>Add Item</h2>;
        }
    };

    function itemback(){
        navigate('/item')
    }
    
    // const handlePriceChange = (value) => {
    //     setPrice(value.toString());
    // };
    

    return (
        <div>
            <div className='container'>
                <br />
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {
                            title()
                        }
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Item Name :</label>
                                    <input type="text" placeholder='Enter Item Name'
                                        name='item_name'
                                        value={item_name}
                                        className={`form-control ${errors.item_name ? 'is-invalid' : ''}`}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                    {errors.item_name && <div className='invalid-feedback'>{errors.item_name}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Price :</label>
                                    <input
                                        type="number"
                                        placeholder='Enter price'
                                        name='rate'
                                        value={rate}
                                        className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                                        onChange={(e) => setPrice(e.target.value)} // Corrected to only trigger for price input
                                    />

                                    {errors.rate && <div className='invalid-feedback'>{errors.rate}</div>}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button className='btn btn-success' onClick={saveItem}>Submit</button>
                                    <button type="button" className="btn btn-primary " onClick={itemback}>
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItemComponents;
