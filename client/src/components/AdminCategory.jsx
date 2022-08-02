import React from 'react'
import { GET_ALL_CATEGORIES_ADMIN } from '../utils/queries';
import { useQuery } from '@apollo/client';
import '../styles/AdminCategory.css'

function AdminCategory() {
  let categoryList;
const { loading, error, data } = useQuery(GET_ALL_CATEGORIES_ADMIN);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(!loading && !error){
    categoryList = data.categories
    // console.log(categoryList)
    }
  return (
    <div  className="admin-category">
      {categoryList.map((category) => {
              return  <div className="productId-List" key={category._id}>
                        <p >{category.name}</p>
                        {category.products.map((product) => {
                          return <p key={product._id}>{product._id}</p>
                        })}
                        
                      </div>
                      })}
    </div>
  )
}

export default AdminCategory