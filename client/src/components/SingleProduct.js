// import single productItem css file
import '../styles/SingleProduct.css';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { SELL_PRODUCT } from '../utils/mutations';

import { GET_SINGLE_PRODUCT} from '../utils/queries';


import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';


const SingleProduct = () => {
  // const [sellProduct] = useMutation(SELL_PRODUCT);

    let productItem;
    const { productId } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
        variables: { id: productId },
    });

  //   const sellItem = async(event) => {
  //       event.preventDefault();
  //       const sellClickID = event.target.id
  //       console.log(sellClickID);
  //       try{
  //         const sellingMutation = await sellProduct({

  //           variables: {id: sellClickID, quantity: 1 }
  //         })
  //         return sellingMutation
  //       } catch (e) {
  //         console.log(e);
  //     }  
  //     }
  const [state, dispatch] = useStoreContext();


  const { cart } = state


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
    productItem = data.product
    }
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === productItem._id)
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: productItem._id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...productItem, purchaseQuantity: 1 }
        });
        idbPromise('cart', 'put', { ...productItem, purchaseQuantity: 1 });
      }
    }
    return(
        <div className="productItem-container">
          <div className="productItem">
            <img src={productItem.images[0]} alt="alternate"/>
            <div className="productItem-details">
                <h2 className='productItem-name'>{productItem.name}</h2>
                <p className='productItem-description'>{productItem.description}</p>

                <p className='productItem-price'>{productItem.price}</p>
                <button id={productItem._id} className='productItem-add-to-cart-btn' onClick={addToCart}>Add to Cart</button>

            </div>
          </div>
        </div>
    )
};

export default SingleProduct;