// import '../styles/Category.css';
import '../styles/AllCategories.css';

import { GET_SINGLE_CATEGORY } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const url = "/product/" 

const SingleCategory = () => {
    let category;
    let categoryName;
    const { categoryId } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_CATEGORY,{
    variables: {id: categoryId }
  });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
      category = data.category.products
      categoryName = data.category.name
    }

    return(
      <>
          <h2>{categoryName}</h2>
        <div className="product-container">
        {category.map((products) => {
            const linkaddress = url.concat(products._id);
            return(
              <Link to={linkaddress} className="product" key={products._id}>
                        <img src={products.images} alt="alternate"/>
                        <div className="details">
                            <h2 className='product-name'>{products.name}</h2>
                            <p className='price'>{products.price}</p>
                        </div>
                            <button className='add-to-cart-btn'>Add to Cart</button>
                    </Link>
        )
        })} 
        </div>
      </>
    )
}


export default SingleCategory;