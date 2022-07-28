import '../styles/AllCategories.css';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const AllCategories = () => {
// info for queries to show products
let productList;
 const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
 if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if(!loading && !error){
    productList = data.products
  }
    return(
        <div className='product-container'>
        {productList.map((product) => {
            return <div>
                    <img src={product.images[0]} alt="alternate"/>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
            </div>
        })} 



            <div className='category'>
            <h3>Category 1</h3>    
                
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 2</p>
                    <p>Price</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 3</p>
                    <p>Price</p>
                </div>
            </div>
            <div className='category'>
            <h3>Category 2</h3>
            <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 1 </p>
                    <p>Price</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 2 </p>
                    <p>Price</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 3</p>
                    <p>Price</p>
                </div>
            </div>

            <div className='category'>
            <h3>Category 3</h3>
            <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 1 </p>
                    <p>Price</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 2</p>
                    <p>Price</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/250" alt="alternate"/>
                    <p>Product Name 3</p>
                    <p>Price</p>
                </div>
            </div>

        </div>
    )
}

export default AllCategories;