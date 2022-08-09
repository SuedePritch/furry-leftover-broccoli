import React,{useState, useEffect} from 'react'
import '../styles/AdminDelivery.css'
function AdminDeliveryList({requestPreview}) {
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



  return (
    <div>
              {orderPreview.map((deliveryItem) =>{
                return <div className="admin-delivery-list" key={deliveryItem._id}>
                  <p className="admin-delivery-item" id='productname'>{deliveryItem._id}</p>
                  <p className="admin-delivery-item">{deliveryItem.cost}</p>
                  <p className="admin-delivery-item">{deliveryItem.parStock}</p>
                  <p className="admin-delivery-item">{deliveryItem.quantity}</p>
                  <p className="admin-delivery-item"></p>
                </div>
              })}
          </div>
  )
}

export default AdminDeliveryList