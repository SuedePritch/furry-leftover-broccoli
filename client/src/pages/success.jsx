import React from 'react';
import { useMutation } from '@apollo/client';
import { SELL_PRODUCT } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [reduceInventory] = useMutation(SELL_PRODUCT);

    const removeItem = async(event) => {
        const cart = await idbPromise('cart', 'get');
        try{
            cart.forEach(async(product) => {
                
                const removeMutation = await reduceInventory({
                    variables: {id: product._id, quantity: product.purchaseQuantity }
                })
                idbPromise('cart', 'delete', product);
                return removeMutation
            })
        } catch (e) {
            console.log(e)
        }
        
        window.location.assign('/');
    }

    return (
        <div>
            <h1>Success!</h1>
            <p>Thank you for your purchase, you will not be redirected to the homepage</p>
            <button onClick={removeItem}>Return to Home</button>
        </div>
    );
}

export default Success;