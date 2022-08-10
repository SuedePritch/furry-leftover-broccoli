import React,{useState, useEffect} from 'react'
import { useMutation } from '@apollo/client';
import {ADD_PRODUCT_DELIVERY} from '../utils/mutations'
import '../styles/AdminDelivery.css'
function AdminDeliveryList({requestPreview}) {
    const [addItemToDelivery] = useMutation(ADD_PRODUCT_DELIVERY)
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
        setOrderPreview(requestPreview)
      }, [requestPreview]);





      const updateQuantityInc = async (e)=>{
        const productForDeliveryEl = e.target.parentElement
        const productIdFromDeliveryRequest = productForDeliveryEl.firstChild.textContent
        const quantityInc = e.target.value
        
        try{
              const creatingANewDelivery = await addItemToDelivery({
                variables: { 
                  products: productIdFromDeliveryRequest,
                  quantityInc: parseInt(quantityInc),
                  // This needs to be dynamic - maybe first non completed one
                  delivery: "62f3b6c7aeb85738fd1a8b81"
                },
              });
              return creatingANewDelivery
            } catch (e) {
              console.log(e);
          }
          }



  return (
    <div>
              {orderPreview.map((deliveryItem) =>{
                return <form className="admin-delivery-list" key={deliveryItem._id}>
                  <p className="admin-delivery-item" id='productname'>{deliveryItem._id}</p>
                  <p className="admin-delivery-item">{deliveryItem.cost}</p>
                  <p className="admin-delivery-item">{deliveryItem.parStock}</p>
                  <p className="admin-delivery-item">{deliveryItem.quantity}</p>
                  <input type="number" className="admin-delivery-item" id="admin-delivery-input" onBlur={updateQuantityInc} placeholder={(deliveryItem.quantity - deliveryItem.parStock) * -1}></input>
                </form>
              })}
          </div>
  )
}

export default AdminDeliveryList