// import single productItem css file
import '../styles/SingleProduct.css';
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_SINGLE_PRODUCT} from '../utils/queries';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import React from "react";

function SingleProduct(item) {
  const [state, dispatch] = useStoreContext();
  const {
    image,
    name,
    _id,
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="productItem-container">
      <div className="productItem">
      <Link to={`/products/${_id}`}>
      <img alt={name} src={`${image}`}/>
      <p>{name}</p>
    
      <div>
        <span>${price}</span>
      </div>
      </Link>
      <button onClick={addToCart}>Add to cart</button>
      
      </div>
    </div>
  );
}

export default SingleProduct;


// const SingleProduct = () =>{
//     let productItem;
//     const { productId } = useParams();
//     const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
//         variables: { id: productId },
//     });

   

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;
//     if(!loading && !error){
//     productItem = data.product
//     }
//     return(
//         <div className="productItem-container">
//           <div className="productItem">
//             <img src={productItem.images[0]} alt="alternate"/>
//             <div className="productItem-details">
//                 <h2 className='productItem-name'>{productItem.name}</h2>
//                 <p className='productItem-description'>{productItem.description}</p>
//                 <p className='productItem-price'>{productItem.price}</p>
//                 <button className='productItem-add-to-cart-btn' onClick={addToCart}>Add to Cart</button>
//             </div>
//           </div>
//         </div>
//     )
// };

// export default SingleProduct;