// import single product css file
import '../styles/SingleProduct.css';

// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import { QUERY_SINGLE_PRODUCT} from '../utils/queries';


const product={
  name: "product1",
  images: [
    '/images/product1-1',
    '/images/product1-2',
    '/images/product1-3',
  ],
  description:'its a rake',
  price:13
}

const SingleProduct = () =>{
    // const { productId } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    //     variables: { productId: productId },
    // });
 
    return(
        <div className="single-product">
        <h2>{product.name}</h2>
        <div className='image'>{product.images}</div>
        <p>{product.description}</p>
        <p>${product.price}</p>
        </div>
    )
};

export default SingleProduct;