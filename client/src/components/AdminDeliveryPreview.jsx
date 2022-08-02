import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DELIVERIES } from '../utils/queries';
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
    const [orderPreview, setOrderPreview] = useState(
        [
        {
            "_id": "1",
            "name": "Order Preview",
            "description": "See it here",
            "images": " ",
            "price": "1",
            "cost": "2",
            "parStock": "3",
            "quantity": "3",
          }
    ])
    useEffect(() => {
        setDeleteReload("nothing");
        console.log('helllo')
      });


    let deliveryList;
    const { loading, error, data } = useQuery(GET_ALL_DELIVERIES, {pollInterval: 1000});
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (!data) return `nomoare daate`
    if (!loading && !error) {
      deliveryList = data.findAllDelivery;  
    };

    const handleReceiving = async (event) => {
        const clickID = event.target.id
        event.preventDefault();
        
        try{
            console.log(deliveryList);
            const deliveryMutation = await updateDelivery ({
                variables: { id: clickID , quantity: JSON.parse(recieveDeliveryItem.quantity) }
            });
            // updateDelivery(deliveryMutation);

            const deliveryMutationB = await deleteFromDelivery ({
                variables: { id: deliveryList._id , products: clickID }
            });
            // deleteFromDelivery(deliveryMutationB);
            return deliveryMutation, deliveryMutationB

        } catch (e) {
            console.log(e);
        }  
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecieveItem({
            ...recieveDeliveryItem,
            [name]: value,
        });
    };

    const deleteCurrentDelivery = async (event) => {
        
        try{
            const deleteMutation = await deleteDelivery ({
                variables: {id: event.target.id}
            })
            setDeleteReload(Math.random());
            console.log(deleteReload);
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
          <h3 className="admin-product-item admin-product-item-label">Name</h3>
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
            Recieved
          </h3>
        </div>
        {/* Spreadsheet content  */}
        

        {deliveryList[0].products.map((product, index) => {
          return (
            <form className="admin-product-list" key={product._id} id={product._id} onSubmit={handleReceiving}>
                      <p className="admin-product-item" id="productname">
                      {product.name}
                    </p>
                    <p className="admin-product-item">{product.cost}</p>
                    <p className="admin-product-item">{product.parStock}</p>
                    <input type="text" className="admin-product-item" placeholder={product.quantity} name="quantity" id="quantity" onChange={handleChange}/>
                    <button className="admin-product-item"  data-index={index} type="submit">
                    ✅ 
                    </button>                 
            </form>
            
          );
        })}
        <button id={deliveryList[0]._id} onClick={deleteCurrentDelivery}>all deliveries recieved</button>  
      </div>
    </div>
  )
}

export default AdminDeliveryPreview