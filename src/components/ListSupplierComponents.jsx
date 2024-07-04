import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listsupplier } from '../services/SupplierService'; // Rename deleteSupplier

import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/supplier_mstr";

const ListSupplierComponents = () => {
    const [supplier, setSupplier] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        listsupplier()
            .then((response) => {
                setSupplier(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function addNewSupplier() {
        navigate('/add_supplier');
    }

    const handleDeleteSupplier = (supplierId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this supplier ?');

        if (isConfirmed) {
            axios.delete(`${REST_API_BASE_URL}/${supplierId}`)
                .then(() => {
                    setSupplier(supplier.filter(supplier => supplier.id !== supplierId));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
  

    return (
        <div className='container'>
            <h2 className='text-center'> List Of Supplier </h2>
            <button type="button" className="btn btn-primary mb-2" onClick={addNewSupplier}>Add New Supplier</button>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Supplier id</th>
                        <th>Supplier Name</th>
                        <th>Mobile No.</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supplier.map(supplier =>
                            <tr key={supplier.id}>
                                <td>{supplier.id}</td>
                                <td>{supplier.supplier_name}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.address}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit_supplier/${supplier.id}`}>
                                        Update
                                    </Link>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => handleDeleteSupplier(supplier.id)} // Use handleDeleteSupplier
                                        style={{ marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListSupplierComponents;
