
// import '../styles/Category.css';
import '../styles/AllCategories.css';

import { GET_ALL_CATEGORIES } from '../utils/queries';
import { useQuery } from "@apollo/client";
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const url = "/category/" 

const AllCategories = () => {
    let category;
    
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
      category = data.categories

    return(
    <>
          {/* <h2>{categoryName}</h2> */}
        <div className="category-container">
        {category.map((categoryInfo) => {
            const linkaddress = url.concat(categoryInfo._id);
            return(
                <Link to={linkaddress} className="category" key={categoryInfo._id}>
                        <div className="category-details">
                            <h2 className='category-name'>{categoryInfo.name}</h2>
                        </div>
                </Link>
        )
    })} 
        </div>
      </>
    )
}

}
export default AllCategories;