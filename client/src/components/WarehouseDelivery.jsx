// import React,{useState, useEffect} from 'react'
import '../styles/AdminDelivery.css'
import { useQuery } from '@apollo/client';
import {GET_NOT_COMPLETE_DELIVERY} from '../utils/queries'


function WarehouseDeliveryList() {
  let deliveryList;
  const { loading, error, data } = useQuery(GET_NOT_COMPLETE_DELIVERY, {variables: {isComplete: true}});
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      if(!loading && !error){
      deliveryList = data.findNotCompleteDelivery[0].productItem
      // console.log(deliveryList)
    }
  return (
    <div className='admin-delivery'>
      <h2>Warehouse</h2>
        {deliveryList.map((deliveryItem) =>{
                return <form className="admin-delivery-list" key={deliveryItem._id}>
                  <p className="admin-delivery-item" id='productname'>{deliveryItem._id}</p>
                  {/* <p className="admin-delivery-item">{deliveryItem.cost}</p>
                  <p className="admin-delivery-item">{deliveryItem.parStock}</p>
                  <p className="admin-delivery-item">{deliveryItem.quantity}</p> */}
                  <p className="admin-delivery-item">{deliveryItem.quantityInc}</p>

                  <input type="number" className="admin-delivery-item" id="admin-delivery-input" 
                  // onBlur={updateQuantityInc} 
                  placeholder={deliveryItem.quantityInc}
                  ></input>
                </form>
        })}
              <button type='submit'>All Items Shipped</button>
    </div>
  )
}

export default WarehouseDeliveryList