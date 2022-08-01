import React,{useState, useEffect} from 'react'

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
        console.log(requestPreview)
        setOrderPreview(requestPreview)
      }, [requestPreview]);



  return (
    <div>
              {orderPreview.map((deliveryItem) =>{
                return <div key={deliveryItem._id}>
                  <p className="admin-delivery-item" id='productname'>{deliveryItem._id}</p>
                  <p className="admin-delivery-item">{deliveryItem.cost}</p>
                  <p className="admin-delivery-item">{deliveryItem.parStock}</p>
                  <p className="admin-delivery-item">{deliveryItem.quantity}</p>
                </div>
              })}
          </div>
  )
}

export default AdminDeliveryList