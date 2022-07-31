import React from 'react'
import { GET_ALL_PRODUCTS_ADMIN } from '../utils/queries';
import { useQuery } from '@apollo/client';

import '../styles/AdminProducts.css'
function AdminProducts() {
// Display all products in spreadsheet format
//shows name price cost parStock quantity delete/add buttons
let productList;
const { loading, error, data } = useQuery(GET_ALL_PRODUCTS_ADMIN);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
    productList = data.allproducts
    }
    return(

      <div>
        
        {/* Spreadsheet Labels */}
          <div className="admin-product">
            <div className="admin-product-list">
              <h3 className="admin-product-item admin-product-item-label">Name</h3>
              <h3 className="admin-product-item admin-product-item-label">Price</h3>
              <h3 className="admin-product-item admin-product-item-label">Cost</h3>
              <h3 className="admin-product-item admin-product-item-label">ParStock</h3>
              <h3 className="admin-product-item admin-product-item-label">Quantity</h3>
              <h3 className="admin-product-item admin-product-item-label" id='addProduct'>+</h3>
            </div>
        {/* Spreadsheet content  */}
          {productList.map((product) => {
              return  <div className="admin-product-list" key={product._id}>
        
                        <p className="admin-product-item" id='productname'>{product.name}</p>
                        <p className="admin-product-item">{product.price}</p>
                        <p className="admin-product-item">{product.cost}</p>
                        <p className="admin-product-item">{product.parStock}</p>
                        <p className="admin-product-item">{product.quantity}</p>
                        <p className="admin-product-item" id='productdelete'>X</p>
        
                      </div>
          })}
          </div>
      </div>
    )
}

export default AdminProducts