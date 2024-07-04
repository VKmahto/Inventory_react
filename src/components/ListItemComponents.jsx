// ListItemComponents.jsx
import React, { useEffect, useState } from 'react';
import { listitem } from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8080/api/items";

const ListItemComponents = () => {
    const [item, setItem] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listitem()
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
    function addNewItem() {
        navigate('/add_item');
    }

    const deleteItem = (itemId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
        axios.delete(REST_API_BASE_URL+'/'+itemId)
            .then(() => {
                setItem(item.filter(item => item.id !== itemId));
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };
    
    
    return (
        <div className="container">
            <h2 className="text-center">List Of Item</h2>
            <button type="button" className="btn btn-primary mb-2" onClick={addNewItem}>
                Add New Item
            </button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Item id</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.item_name}</td>
                            <td>{item.rate}</td>
                           
                            <td>
                                <Link className="btn btn-info" to={`/edit_item/${item.id}`}>
                                    Update
                                </Link>
                                <button className='btn btn-danger' onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px' }}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListItemComponents;
