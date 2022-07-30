import '../styles/AllCategories.css';
import { Link } from 'react-router-dom'
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from '@apollo/client';


const url = "/product/" 


const Allproducts = () => {
// Display all products
// iterates over the list of products and creates a link to the single product page
//shows image, name, price, and add to cart button
let productList;
const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
        console.log(data)
    productList = data.allproducts
    }
    return(
        <div className="product-container">
        {productList.slice(0,15).map((product) => {
            const linkaddress = url.concat(product._id)
            return  <Link to={linkaddress} className="product" key={product._id}>
                        <img src={product.images[0]} alt="alternate"/>
                        <div className="details">
                            <h2 className='product-name'>{product.name}</h2>
                            <p className='price'>${product.price}</p>
                        </div>
                            <button className='add-to-cart-btn'>Add to Cart</button>
                    </Link>
        })} 
        </div>
    )
}

export default Allproducts;