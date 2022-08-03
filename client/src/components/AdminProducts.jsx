import React, { useState } from "react";
import { GET_ALL_PRODUCTS_ADMIN } from "../utils/queries";
import { UPDATE_PRODUCT_ROW } from "../utils/mutations";
import { DELETE_PRODUCT } from "../utils/mutations";
import { CREATE_PRODUCT_ADD_CAT } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/AdminProducts.css";

const Categories = [
  { label: "Collectibles", value: "62e18b19df691851404f8b61"},
  { label: "Toys", value: "62e18b8fdf691851404f8b63"},
  { label: "Video Games", value: "62e18b73df691851404f8b62"},
  { label: "Apparel", value: "62e18ba3df691851404f8b64"}
];


function AdminProducts() {

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [createProduct] = useMutation(CREATE_PRODUCT_ADD_CAT);


  // sets state for new product form to false so it does not render on load up

  const [showForm, setShowForm] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', price: '', cost: '', parStock: '', quantity: '', description: '', category: ''})
  // Display all products
  // iterates over the list of products and creates a link to the single product page
  //shows image, name, price, and add to cart button
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [updateRow] = useMutation(UPDATE_PRODUCT_ROW);

  let productList;
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS_ADMIN, {pollInterval: 1000});
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!loading && !error) {
    productList = data.allproducts;
  }

  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async(event) =>{
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
      return updatingRow;
    }
    catch(e){
      console.log(e);
    }
  };

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
  // function to open and close to create product modal
  const openForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({...newForm, [event.target.name]: event.target.value})
  }

  //function to confirm if user would like to delete product
  const deleteAlert = async (event) => {
    event.preventDefault();
    const clickID = event.target.id;
    console.log(clickID);
    let x = window.confirm("are you sure you want to delete this product?");
    if (x) {
      handleDeleteProduct(clickID);
    } else {
      return
    }
  }

  // function to delete the target product
  const handleDeleteProduct = async (clickID) => {
    try{
      const deleteMutation = await deleteProduct ({
        variables: { id: clickID }
      });
      return deleteMutation;
    } catch (e) {
      console.log(e);
    }
    
  }

  // creates a new product and adds it to the selected category
  const handleCreateProduct = async () => {
    try{
      const createProductMutation = await createProduct ({
        variables: {
          name: newForm.name , 
          description: newForm.description , 
          images: newForm.images , 
          price: JSON.parse(newForm.price) , 
          cost: JSON.parse(newForm.cost), 
          parStock: JSON.parse(newForm.parStock) , 
          quantity: JSON.parse(newForm.quantity) , 
          category: newForm.category }
      })
      return createProductMutation;
    } catch (e) {
      console.log(e);
    }
  }




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
      {showForm && (
        <form className="input-field" onSubmit={handleCreateProduct}> 
            <input  className="input-name" type="text" value={newForm.name} onChange={formUpdate} name="name" placeholder="name"/>
            <textarea  className="input-description" type="text" value={newForm.description} onChange={formUpdate} name="description" placeholder="write a description here......"/>
            <input  type="number" value={newForm.price} onChange={formUpdate} name="price" placeholder="price"/>
            <input  type="number" value={newForm.cost} onChange={formUpdate} name="cost" placeholder="cost"/>
            <input  type="number" value={newForm.parStock} onChange={formUpdate} name="parStock" placeholder="parStock"/>
            <input  type="number" value={newForm.quantity} onChange={formUpdate} name="quantity" placeholder="in house quantity"/>
            <select className="form-control" name="category" placeholder="select a category" onChange={formUpdate}>  
              < option value="62e18b19df691851404f8b61" >Collectibles</option>
              < option value="62e18b8fdf691851404f8b63" >Toys</option>
              < option value="62e18b73df691851404f8b62" >Video Games</option>
              < option value="62e18ba3df691851404f8b64" >Apparel</option>
            </select> 
            <button type="submit">Create</button>
            <span onClick={openForm}>
              Cancel
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
            id="addProduct" onClick={openForm}
          >
            +
          </h3>
        </div>
        {/* Spreadsheet content  */}
        {productList.map((product, index) => {
          return (
            <div className="admin-product-list" key={product._id} data-index={index} >
              <p className="admin-product-item" id="productname" onClick={setContent}>
                {product.name}
              </p>
              <p className="admin-product-item" onClick={setContent}>{product.price}</p>
              <p className="admin-product-item" onClick={setContent}>{product.cost}</p>
              <p className="admin-product-item" onClick={setContent}>{product.parStock}</p>
              <p className="admin-product-item" onClick={setContent}>{product.quantity}</p>
              <p className="admin-product-item" id={product._id} onClick={deleteAlert}>
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
