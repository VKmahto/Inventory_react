import React, {useEffect, useState} from 'react'
import { listemployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {

   const [employee, setEmployee] = useState([])

   const navigate = useNavigate();

   useEffect(()=> {
    listemployee().then((response)=>{
        setEmployee(response.data);
    }).catch(error =>{
        console.error(error);
    })

   },[])

   function addNewEmployee(){
    navigate('/add_employee')
   }
  
  return (
    <div className='container'>
      <h2 className='text-center'>List Of Employee For Testing</h2>
      <button type="button" className="btn btn-primary mb-2" onClick={addNewEmployee}> Add Employee  </button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Employee id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email </th>
            </tr>
        </thead>
        <tbody>
            {
                employee.map(employee =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>

                    </tr> )
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponents
