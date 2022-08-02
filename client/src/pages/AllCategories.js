import React from "react";
import AllCategories from "../components/AllCategories";
import AllProducts from "../components/AllProducts";
import Cart from "../components/Cart";

const CategoryPage = () => {
  return (
    <div className="container">
        <Cart/>
        <AllCategories/>
        <AllProducts/>
        
    </div>
  )
}

export default CategoryPage;