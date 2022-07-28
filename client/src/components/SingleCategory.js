// import '../styles/Category.css';
import { GET_SINGLE_CATEGORY } from '../utils/queries';
import { useQuery } from "@apollo/client";

const SingleCategory = () => {
// call the query for category/product
    let category;
    const { loading, error, data } = useQuery(GET_SINGLE_CATEGORY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
      category = data.categories
    }
    console.log(category)

    return(
        <div>
          <div>
               <h2>{category.name}</h2>
               </div>
               {category.map((product) => (
               
            //    <ul>
            //        <li key={products.id}>
                   <div>
                       <div>
                           <h3>{[product.name]}</h3>
                           <div className='image'>{[product.image]}</div>
                           <p>${product.price}</p>
                       </div>
                       </div>
        //                </li>
        // </ul>
               ))}
         
       
        </div>
    )
}


export default SingleCategory;