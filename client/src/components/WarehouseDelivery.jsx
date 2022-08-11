import React, {useState} from 'react'
import '../styles/AdminDelivery.css'
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_PRODUCT_ITEM } from '../utils/mutations';
import { SET_DELIVERY_COMPLETE } from '../utils/mutations';
import {GET_NOT_COMPLETE_DELIVERY} from '../utils/queries';


function WarehouseDeliveryList() {
const [updateProductItem] = useMutation(UPDATE_PRODUCT_ITEM);
const [setDeliveryComplete] = useMutation(SET_DELIVERY_COMPLETE);
const [warehouseProduct, setWarehouseProduct] = useState('')
  let deliveryList;
  let setDeliveryCompleteIDHANDLER;
  const { loading, error, data } = useQuery(GET_NOT_COMPLETE_DELIVERY, {variables: {isComplete: false}});
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      if(!loading && !error){
        if(data.findNotCompleteDelivery[0]){
      deliveryList = data.findNotCompleteDelivery[0].productItem
      setDeliveryCompleteIDHANDLER = data.findNotCompleteDelivery[0]._id
    } else {
      alert("warehouse is up to date")
      window.location.assign('/admin')
    }
    };

    const handleChange = (event) => {
      setWarehouseProduct(
        event.target.value
      );
  };

  const handleDelivery = async (event) => {
    const clickID = event.target.id
    event.preventDefault();
    
    try{
      const productItemMutation = await updateProductItem ({
        variables: { id: clickID , quantityInc: parseInt(warehouseProduct)}
      });
        return productItemMutation;

    } catch (e) {
        console.log(e);
    }  
};

const handleCompleteDelivery = async (event) => {
  console.log(setDeliveryCompleteIDHANDLER)
  const clickID = event.target.id
  event.preventDefault();

  try{
    const completeDeliveryMutation = await setDeliveryComplete ({
      variables: { id: clickID , isComplete: true }
    });
    alert(`Delivery #${setDeliveryCompleteIDHANDLER} has been shipped`);
    return completeDeliveryMutation;
  } catch (e) {
    console.log(e);
  }
};



  return (
    <div className='admin-delivery'>
      <h2>Warehouse</h2>
        {deliveryList.map((deliveryItem, index) =>{
                return <form className="admin-delivery-list" key={deliveryItem._id} id={deliveryItem._id} onSubmit={handleDelivery}>
                  <p className="admin-delivery-item" id='productname'>{deliveryItem._id}</p>
                  <p className="admin-delivery-item">{deliveryItem.quantityInc}</p>

                  <input type="number" className="admin-delivery-item" id="admin-delivery-input"
                  name="admin-delivery-input"
                  onChange={handleChange}
                  placeholder={deliveryItem.quantityInc}
                  />
                  <button className="admin-delivery-item" id='checkmark' data-index={index} type="submit">
                    ✅ 
                    </button> 
                </form>
        })}
        <button onClick={handleCompleteDelivery} id={setDeliveryCompleteIDHANDLER}>Mark Delivery Complete</button>
    </div>
  )
}

export default WarehouseDeliveryList