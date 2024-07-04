import './App.css';
// import FooterComponents from './components/FooterComponents';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import HeaderComponents from './components/HeaderComponents';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddEmployeeComponents from './components/AddEmployeeComponents';
import ListItemComponents from './components/ListItemComponents';
import AddItemComponents from './components/AddItemComponents';
import ListSupplierComponents from './components/ListSupplierComponents';
import AddSupplierComponents from './components/AddSupplierComponents';
import ListPurchaseComponents from './components/ListPurchaseComponents';
import AddPurchaseComponents from './components/AddPurchaseComponents';
import ListSaleComponents from './components/ListSaleComponents';
import AddSaleComponents from './components/AddSaleComponents';
import StockService from './components/StockService';
import ListPurchase_details from './components/ListPurhcase_details';
import ListSale_details from './components/ListSale_details';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  return (
    <>
    <BrowserRouter>
      
      <HeaderComponents/>
        <Routes>
          <Route path='/' element = {<Signup/>}></Route>
          <Route path='/employees' element = {<ListEmployeeComponents/>}></Route>
          <Route path='/add_employee' element = {<AddEmployeeComponents/>}></Route>
          <Route path='/item' element = {<ListItemComponents/>}></Route>
          <Route path='/add_item' element = {<AddItemComponents/>}></Route>
          <Route path='/edit_item/:id' element={<AddItemComponents/>}></Route>
          <Route path='/supplier' element ={<ListSupplierComponents/>} ></Route>
          <Route path='/add_supplier' element={<AddSupplierComponents/>}></Route>
          <Route path='/edit_supplier/:id' element={<AddSupplierComponents/>}></Route>
          <Route path='/purchase' element={<ListPurchaseComponents/>}></Route>
          <Route path='/add_purchase' element={<AddPurchaseComponents/>} ></Route>
          <Route path='/sale' element={<ListSaleComponents/>}></Route>
          <Route path='/add_sale' element={<AddSaleComponents/>}></Route>
          <Route path='/stock' element={<StockService/>}></Route>
          <Route path='/purchase_Details/:purchaseId' element={<ListPurchase_details/>}></Route>
          <Route path='/sale_Details/:saleId' element={<ListSale_details/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
        {/* <FooterComponents/> */}
    </BrowserRouter>
   

           
    </>
  )
}

export default App;
