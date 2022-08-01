import React, {useState} from 'react'
import { GET_ALL_PRODUCTS_ADMIN } from '../utils/queries';
import { useQuery } from '@apollo/client';
import '../styles/AdminDelivery.css'
import AdminDeliveryList from './AdminDeliveryList';
function AdminDelivery() {
  
  const [requestPreview, setRequestPreview] = useState([]) 

  // useEffect(() => {

  //   console.log(requestPreview)
    
  // },[requestPreview]);


  const handleAddToDelivery = (event) =>{
    const productClicked = event.target.dataset
    const productClickedObj = {
      "_id": productClicked.id,
      "name": productClicked.name,
      "description": productClicked.description,
      "images": productClicked.images,
      "price": productClicked.price,
      "cost": productClicked.cost,
      "parStock": productClicked.parStock,
      "quantity": productClicked.quantity,
    }
    let deliveryArray = requestPreview
    deliveryArray.push(productClickedObj)
    setRequestPreview([...deliveryArray])
    console.log(requestPreview)

    
  }










  
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

      <div className='container'>
        
        {/* Spreadsheet Labels */}
          <div className="admin-delivery">
            <div className="admin-delivery-list">
              <h3 className="admin-delivery-item admin-delivery-item-label">Id</h3>
              <h3 className="admin-delivery-item admin-delivery-item-label">Cost</h3>
              <h3 className="admin-delivery-item admin-delivery-item-label">ParStock</h3>
              <h3 className="admin-delivery-item admin-delivery-item-label">Quantity</h3>
              {/* <h3 className="admin-delivery-item admin-delivery-item-label" id='addProduct'>+</h3> */}
            </div>
        {/* Spreadsheet content  */}
          {productList.map((delivery) => {
              return  <div className="admin-delivery-list" key={delivery._id}>
        
                        <p className="admin-delivery-item" id='productname'>{delivery._id}</p>
                        <p className="admin-delivery-item">{delivery.cost}</p>
                        <p className="admin-delivery-item">{delivery.parStock}</p>
                        <p className="admin-delivery-item">{delivery.quantity}</p>
                        <p className="admin-delivery-item" id='productdelete' onClick={handleAddToDelivery}
                          data-id={delivery._id}
                          data-name={delivery.name}
                          data-description={delivery.description}
                          data-images={delivery.images}
                          data-price={delivery.price}
                          data-cost={delivery.cost}
                          data-parstock={delivery.parStock}
                          data-quantity={delivery.quantity}
                          >+</p>
        
                      </div>
          })}
          </div>
            {/* Spreadsheet Labels */}
            <div className="admin-delivery">
              <div className="admin-delivery-list">
                <h3 className="admin-delivery-item admin-delivery-item-label">Id</h3>
                <h3 className="admin-delivery-item admin-delivery-item-label">Cost</h3>
                <h3 className="admin-delivery-item admin-delivery-item-label">ParStock</h3>
                <h3 className="admin-delivery-item admin-delivery-item-label">Quantity</h3>
                {/* <h3 className="admin-delivery-item admin-delivery-item-label" id='addProduct'>+</h3> */}
              </div>
          <AdminDeliveryList requestPreview={requestPreview}/>
          </div>
      </div>
    )
}

export default AdminDelivery