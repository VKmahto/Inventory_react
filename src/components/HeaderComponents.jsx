import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponents = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <Link className="navbar-brand" to="/">Inventory Management System</Link>
          <div className="navbar-nav">
            <div className="row">
              <div className="col">
                <Link className="nav-link" to="/employees">Employees</Link>
              </div>
              <div className="col">
                <Link className="nav-link" to="/item">Items</Link>
              </div>
              <div className="col">
                <Link className="nav-link" to="/supplier">Suppliers</Link>
              </div>
              <div className="col">
                <Link className="nav-link" to="/purchase">Purchases</Link>
              </div>
              <div className="col">
                <Link className="nav-link" to="/sale">Sales</Link>
              </div>
              <div className="col">
                <Link className="nav-link" to="/stock">Stock</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponents;
