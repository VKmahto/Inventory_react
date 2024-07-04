import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { listpurchase } from '../services/PurchaseService';
import { listsupplier } from '../services/SupplierService';


const ListPurchaseComponents = () => {
    const [purchases, setPurchase] = useState([]);
    const [supplier, setSupplier] =useState([]);
    const navigate = useNavigate();
    
    console.log("purchases :::::::::::::"+purchases);
    useEffect(()=>{
        listpurchase().then((responce)=>{
            setPurchase(responce.data)
            
        }).catch(error => {
            console.error(error);
        });


        listsupplier()
        .then((response) => {
            setSupplier(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    },[])

  
    function addNewPurchase(){
        navigate('/add_purchase')
       }

    const getSupplierName = (supplierId) => {
        const selectedSupplier = supplier.find(s => s.id === supplierId);
        return selectedSupplier ? selectedSupplier.supplier_name : '';
    };
      
    return (
        <div className='container'>
            <h2 className='text-center'> List Of Purchase </h2>
            <button type="button" className="btn btn-primary mb-2" onClick={addNewPurchase}>Add New Purchase</button>

            <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Purchase id</th>
                    <th>Invoice No.</th>
                    <th>Invoice Date</th>
                    <th>Supplier Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            
                {
                    
                    purchases?.map((purchase) =>(
                        
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.invoice_no}</td>
                            <td>{purchase.invoice_date}</td>
                            <td>{purchase.supplier ? getSupplierName(purchase.supplier.id) : 'N/A'}</td>
                            <td>
                                <Link className="btn btn-info" to={`/purchase_Details/${purchase.id}`}>
                                            View
                                </Link>
                            </td>
                        </tr> 
                    )
                )} 
            </tbody>
            </table>
        
        </div>
  )
}

export default ListPurchaseComponents
