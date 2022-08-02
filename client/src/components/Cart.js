import React, { useEffect } from 'react';
import CartItem from './CartItem';
import Auth from '../utils/auth';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { idbPromise } from '../utils/helpers';
import { QUERY_CHECKOUT } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';
// will have to import css


const stripePromise = loadStripe('pk_test_51LSLRKCvrmKlIBYd8OOpeFi9eVMocP6TsBxJCVYTCoB1Qf5HWYcTDRIc5sIePDwakOUWbofcLN3fnHSE8eqBLQnQ00iIyXEVeb');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);
  
    useEffect(() => {
      async function getCart() {
        const cart = await idbPromise('cart', 'get');
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      }
  
      if (!state.cart.length) {
        getCart();
      }
    }, [state.cart.length, dispatch]);
  
    function toggleCart() {
      dispatch({ type: TOGGLE_CART });
    }
  
    function calculateTotal() {
      let sum = 0;
      state.cart.forEach((item) => {
        sum += item.price * item.purchaseQuantity;
      });
      return sum.toFixed(2);
    }
  

    function submitCheckout() {
      const productIds = [];
  
      state.cart.forEach((item) => {
        for (let i = 0; i < item.purchaseQuantity; i++) {
          productIds.push(item._id);
        }
      });
  
      getCheckout({
        variables: { products: productIds },
      });
    }
  
    if (!state.cartOpen) {
      return (
        <div className="cart-closed" onClick={toggleCart}>
          <span role="img" aria-label="trash">
            🛒
          </span>
        </div>
      );
    }
  
    return (
      <div className="cart">
        <button onClick={toggleCart} > [close]</button> 
        <h2>Shopping Cart</h2>
        {state.cart.length ? (
          <div>
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))} 
              Total: ${calculateTotal()}
  
              {Auth.loggedIn() ? (
                <button onClick={submitCheckout}>Checkout</button>
              ) : (
                <span>(log in to check out)</span>
              )}
          </div>
        ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
            </span>
            You haven't added anything to your cart yet!
          </h3>
        )}
      </div>
    );
  };
  
  export default Cart;