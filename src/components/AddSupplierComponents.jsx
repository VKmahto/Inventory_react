import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createSupplier, updateSupplier } from '../services/SupplierService'
import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8080/api/supplier_mstr";


const AddSupplierComponents = () => {

    const [supplier_name, setSupplierName] = useState('')
    const [phone , setPhone] = useState('')
    const [address , setAddress] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        supplier_name:'',
        phone : '',
        address: ''
    })

    useEffect(() => {
        if(id){
            axios.get(`${REST_API_BASE_URL}/${id}`)
                .then(response => {
                    const {supplier_name, phone, address} = response.data;
                    setSupplierName(supplier_name);
                    setPhone(phone);
                    setAddress(address);
                }).catch(error => {
                    console.error(error);
                });
        }
    }, [id]);
    

    function saveSupplier(e){
        e.preventDefault();
        if(validateform()){
            const supplier = {supplier_name,phone,address}
            console.log(supplier)
            if (id){
                updateSupplier(id, supplier)
                    .then(response =>{
                    console.log(response.data);
                    navigate('/supplier');
                }).catch(error =>{
                    console.log(error);
                });
            }else{
                createSupplier(supplier).then((response)=> {
                    console.log(response.date);
                    navigate('/supplier')
                })
            }
        }
    }

    function validateform(){
        let valid = true

        const errorsCopy = { ...errors }

        if(supplier_name.trim()){
            errorsCopy.supplier_name = '';
        }else{
            errorsCopy.supplier_name = 'Supplier name is required';
            valid = false
        }

        if (phone.trim().length === 10) {
            errorsCopy.phone = '';
        } else {
            errorsCopy.phone = 'Mobile number should be 10 digits';
            valid = false;
        }

        if(address.trim()){
            errorsCopy.address= '';
        }else{
            errorsCopy.address = 'Address  is required';
            valid= false
        }
        setErrors(errorsCopy);
        return valid
    }

    const title = () =>{
        if(id) {
            return <h2 className='text-center'>Update Supplier </h2>
        } else {
            return <h2>Add Supplier</h2>
        }
    }
    function supplierback(){
        navigate('/supplier')
    }

    const handleMobileChange = (e) => {
        const value = e.target.value;
        const truncatedValue = value.slice(0, 10); // Limit to 10 digits
        setPhone(truncatedValue);
    };

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
                                    <label className='form-label'>Supplier Name :</label>
                                    <input type="text" placeholder='Enter Supplier Name' 
                                    name='supplier_name'
                                    value={supplier_name} 
                                    className={`form-control ${errors.supplier_name ? 'is-invalid' :''}`}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                    />
                                    {errors.supplier_name && <div className='invalid-feedback'>{errors.supplier_name}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Mobile No. :</label>
                                    <input type="text" placeholder='Enter Mobile No' 
                                    name='phone'
                                    value={phone} 
                                    className={`form-control ${errors.phone ? 'is-invalid' :''}`}
                                    onChange={handleMobileChange} // Changed here
                                    />
                                    {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Address :</label>
                                    <input type="text" placeholder='Enter Address' 
                                    name='address'
                                    value={address} 
                                    className={`form-control ${errors.address ? 'is-invalid' :''}`}
                                    onChange={(e) => setAddress(e.target.value) }
                                    />
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button className='btn btn-success' onClick={saveSupplier}>Submit</button>
                                    <button type="button" className="btn btn-primary mb-2" onClick={supplierback}>
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSupplierComponents
