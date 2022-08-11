import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOT_COMPLETE_DELIVERY } from '../utils/queries';
import { ADD_QUANTITY } from "../utils/mutations";
import { REMOVE_FROM_DELIVERY } from '../utils/mutations';
import { DELETE_DELIVERY } from '../utils/mutations';
import "../styles/AdminProducts.css";


function AdminDeliveryPreview({requestPreview}) {
 const [updateDelivery] = useMutation(ADD_QUANTITY);
 const [deleteFromDelivery] = useMutation(REMOVE_FROM_DELIVERY);
 const [deleteDelivery] = useMutation(DELETE_DELIVERY);
 const [deleteReload, setDeleteReload] = useState("james");
 const [recieveDeliveryItem, setRecieveItem] = useState({ id: '', quantity: ''})

 useEffect(() => {
  setDeleteReload("nothing");
 
});

    let deliveryList;
    let deliveryInfo;
    const { loading, error, data } = useQuery(GET_NOT_COMPLETE_DELIVERY, {variables:{isComplete: true}, pollInterval: 1000} );
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (!data) return `nomoare daate`
    if (!loading && !error) {
      if(data.findNotCompleteDelivery[0]){
        deliveryList = data.findNotCompleteDelivery[0].productItem
        deliveryInfo = data.findNotCompleteDelivery[0]
      } else {
        alert("warehouse is up to date");
      window.location.assign('/admin');
      }
      
      
    };

    const handleReceiving = async (event) => {
        const clickID = event.target.id
        const targetedQuantity = event.target.dataset.quantity
        const targetProduct = event.target.dataset.productid
        
        event.preventDefault();
        
        try{
                const addProductToInventory = await updateDelivery ({
                  variables: { id: targetProduct, quantity: parseInt(targetedQuantity) }
                })

                const removeProductFromDelivery = await deleteFromDelivery ({
                variables: { id: clickID , delivery: deliveryInfo._id }

            });
            setDeleteReload(Math.random());
            console.log(deleteReload);
            return addProductToInventory, removeProductFromDelivery;

        } catch (e) {
            console.log(e);
        }
        
    };

    const deleteCurrentDelivery = async (event) => {
        
        try{
            const deleteMutation = await deleteDelivery ({
                variables: {id: event.target.id}
            })
            return deleteMutation;
        } catch (e) {
            console.log(e);
        }

    }


  return (
    <div>
      {/* Spreadsheet Labels */}
      <div className="admin-product">
        <div className="admin-product-list">
          <h3 className="admin-product-item admin-product-item-label">Id</h3>
          <h3 className="admin-product-item admin-product-item-label"> </h3>
          <h3 className="admin-product-item admin-product-item-label"> </h3>
          <h3 className="admin-product-item admin-product-item-label">
            Quantity
          </h3>
          <h3
            className="admin-product-item admin-product-item-label"
            id="received-label"
          >
            Received
          </h3>
        </div>
        {/* Spreadsheet content  */}
        

        {deliveryList.map((product, index) => {
          return (
            <form className="admin-product-list" 
            key={product._id} 
            id={product._id} 
            data-productid={product.products._id}
            data-quantity={product.quantityInc} 
            onSubmit={handleReceiving}>
                      <p className="admin-product-item" id="productname">
                      {product.products._id}
                    </p>
                    <p className="admin-product-item">{product.cost}</p>
                    <p className="admin-product-item">{product.cost}</p>
                    <p className="admin-product-item">{product.quantityInc}</p>
                    {/* <input type="text" className="admin-product-item" placeholder={product.quantityInc} name="quantity" id="quantity" onChange={handleChange}/> */}
                    <button className="admin-product-item" id='checkmark' data-index={index} type="submit">
                    ✅ 
                    </button>                 
            </form>
            
          );
        })}
        <button className="received-order-button" id={deliveryInfo._id}  onClick={deleteCurrentDelivery}>Received Delivery</button>  
      </div>
    </div>
  )
}

export default AdminDeliveryPreview