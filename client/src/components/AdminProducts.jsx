import React, { useState } from "react";
import { GET_ALL_PRODUCTS_ADMIN } from "../utils/queries";
import { UPDATE_PRODUCT_ROW } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

import "../styles/AdminProducts.css";


function AdminProducts() {
  // Display all products
  // iterates over the list of products and creates a link to the single product page
  //shows image, name, price, and add to cart button
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [updateRow] = useMutation(UPDATE_PRODUCT_ROW);

  let productList;
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS_ADMIN);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!loading && !error) {
    productList = data.allproducts;
  }

  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async(event) =>{
    console.log(modalContent._id);
    event.preventDefault();
    try{
      const updatingRow = await updateRow({
        variables: { 
          id: modalContent._id,
          name: modalContent.name,
          price: JSON.parse(modalContent.price),
          cost: JSON.parse(modalContent.cost),
          parStock: JSON.parse(modalContent.parStock),
          quantity: JSON.parse(modalContent.quantity),
          description: modalContent.description,
          
        },
      });
      console.log(updatingRow);
    }
    catch(e){
      console.log(e);
    }
  }

  // function to populate the modal when you click on a line
  const setContent=(event)=>{
    // console.log(event.target.parentNode.dataset.index);
    // console.log(productList[event.target.parentNode.dataset.index]);
    setModalContent({...productList[event.target.parentNode.dataset.index]})
    modalTrigger();
 }

 // function to update the row info through the modal
  const modalUpdate = (event) =>{
    setModalContent({...modalContent, [event.target.name]: event.target.value})
    console.log('update---log');
}

// function to open/close the modal
  const modalTrigger = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      {showModal && (
        <form className="input-field" onSubmit={handleUpdateProduct}> 
            <input  className="input-name" type="text" value={modalContent.name} onChange={modalUpdate} name="name"/>
            <textarea  className="input-description" type="text" value={modalContent.description} onChange={modalUpdate} name="description"/>
            <input  type="number" value={modalContent.price} onChange={modalUpdate} name="price"/>
            <input  type="number" value={modalContent.cost} onChange={modalUpdate} name="cost"/>
            <input  type="number" value={modalContent.parStock} onChange={modalUpdate} name="parStock"/>
            <input  type="number" value={modalContent.quantity} onChange={modalUpdate} name="quantity"/>
            <button type="submit">SAVE</button>
            <span onClick={modalTrigger}>
              CLOSE
            </span>

        </form>
      )}
      {/* Spreadsheet Labels */}
      <div className="admin-product">
        <div className="admin-product-list">
          <h3 className="admin-product-item admin-product-item-label">Name</h3>
          <h3 className="admin-product-item admin-product-item-label">Price</h3>
          <h3 className="admin-product-item admin-product-item-label">Cost</h3>
          <h3 className="admin-product-item admin-product-item-label">
            ParStock
          </h3>
          <h3 className="admin-product-item admin-product-item-label">
            Quantity
          </h3>
          <h3
            className="admin-product-item admin-product-item-label"
            id="addProduct"
          >
            +
          </h3>
        </div>
        {/* Spreadsheet content  */}
        {productList.map((product, index) => {
          return (
            <div className="admin-product-list" key={product._id} data-index={index} onClick={setContent}>
              <p className="admin-product-item" id="productname">
                {product.name}
              </p>
              <p className="admin-product-item">{product.price}</p>
              <p className="admin-product-item">{product.cost}</p>
              <p className="admin-product-item">{product.parStock}</p>
              <p className="admin-product-item">{product.quantity}</p>
              <p className="admin-product-item" id="productdelete">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminProducts;
