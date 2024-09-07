import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import '../styles/Admin.scss';
import AddProduct from '../components/admin/AddProduct';
import Products from '../components/admin/Products';
import SingleProduct from '../components/admin/SingleProduct';


const Orders = () => <div>Orders</div>;

const Customers = () => <div>Customers</div>;
export const Admin = () => {
    return (
        <div className="admin">
            <div className="admin__header">
                <div className="admin__logo">
                    <span className='material-symbols-outlined'>share_location</span>
                    <span>Clever Food</span>
                </div>
                <div className="admin__gap"></div>
                <div className="admin__title">
                    <span className='material-symbols-outlined'>account_circle</span>
                    <span className='admin__name'>Admin</span>
                </div>
            </div>
            <div className="admin__content">
                <div className="admin__left">
                    <NavLink className='admin__menuItem' to='/admin/orders'>Orders</NavLink>
                    <NavLink className='admin__menuItem' to='/admin/products'>Products</NavLink>
                    <NavLink className='admin__menuItem' to='/admin/add-product'>Add products</NavLink>
                    <NavLink className='admin__menuItem' to='/admin/customers'>Customers</NavLink>
                </div>
                <div className="admin__right">
                    <Routes>
                        <Route path="orders" element={<Orders />} />
                        <Route path="products" element={<Products />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="products/:id" element={<SingleProduct />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}



export default Admin;
