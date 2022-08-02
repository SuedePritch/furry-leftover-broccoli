// import single productItem css file
import '../styles/SingleProduct.css';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_SINGLE_PRODUCT} from '../utils/queries';


const SingleProduct = () =>{
    let productItem;
    const { productId } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
        variables: { id: productId },
    });


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
    productItem = data.product
    }
    return(
        <div className="productItem-container">
          <div className="productItem">
            <img src={productItem.images[0]} alt="alternate"/>
            <div className="productItem-details">
                <h2 className='productItem-name'>{productItem.name}</h2>
                <p className='productItem-description'>{productItem.description}</p>
                <p className='productItem-price'>${productItem.price}</p>
                <button className='productItem-add-to-cart-btn'>Add to Cart</button>
            </div>
          </div>
        </div>
    )
};

export default SingleProduct;