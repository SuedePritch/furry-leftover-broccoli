import '../styles/AllCategories.css';
// import { Link } from 'react-router-dom'
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

import React, { useEffect } from 'react';
import SingleProduct from '../components/SingleProduct';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
const url = "/product/" 


function Allproducts(){
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  const productslisting = state.products;

  return (
    <div >
      <h2>Products:</h2>
      {state.products.length ? (
        <div className="product-container">
          {productslisting.map((product) => (
            <SingleProduct
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <h1>LOADING</h1> : null}
    </div>
  )
}
// const Allproducts = () => {


// // Display all products
// // iterates over the list of products and creates a link to the single product page
// //shows image, name, price, and add to cart button
// let productList;
// const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;
//     if(!loading && !error){
//         // console.log(data)
//     productList = data.allproducts
//     }
 
//     return(
//         <div className="product-container">
//           {productList.map((product)=> (
//             <SingleProduct
//             key={product._id}
//               _id={product._id}
//               image={product.image}
//               name={product.name}
//               price={product.price}
//               quantity={product.quantity}
//             />
//           ))}
//         {/* {productList.slice(0,15).map((product) => {
//             const linkaddress = url.concat(product._id)
//             return  <Link to={linkaddress} className="product" key={product._id}>
//                         <img src={product.images[0]} alt="alternate"/>
//                         <div className="details">
//                             <h2 className='product-name'>{product.name}</h2>
//                             <p className='price'>${product.price}</p>
//                         </div>
//                             <button className='add-to-cart-btn' onClick={addToCart}>Add to Cart</button>
//                     </Link>
//         })}  */}
//         </div>
//     )
// }

export default Allproducts;