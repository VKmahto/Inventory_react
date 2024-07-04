import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { listSale } from '../services/SaleMstrService';


const ListSaleComponents = () => {
    const [listsales, setSale] = useState([]);
    const navigate = useNavigate();
    
    // console.log("purchases :::::::::::::"+listsale);

    // listsale.map(x => console.log("helooooooooo"+x))

    useEffect(()=>{
        listSale().then((responce)=>{
            setSale(responce.data)
        }).catch(error => {
            console.error(error);
        });

    },[])
    
    
    
    function NewSale(){
        navigate('/add_sale')
       }

      
    return (
        <div className='container'>
            <h2 className='text-center'> List Of Sale </h2>
            <button type="button" className="btn btn-primary mb-2" onClick={NewSale}>Add New Purchase</button>

            <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Sale id</th>
                    <th>Customer Name</th>
                    <th>Mobile No</th>
                    <th>Action</th>
                    
                </tr>
            </thead>
            <tbody>
            {listsales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.customer_name}</td>
                            <td>{sale.mobile_no}</td>
                            <td>
                                <Link className="btn btn-info" to={`/sale_Details/${sale.id}`}>
                                            View
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
            </table>
        
        </div>
  )
}

export default ListSaleComponents
