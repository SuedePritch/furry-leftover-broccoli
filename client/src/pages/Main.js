import React from "react";
import AllCategories from "../components/AllCategories";
import AllProducts from "../components/AllProducts";

const CategoryPage = () => {
  return (
    <div className="container">
        <AllCategories/>
        <AllProducts/>
    </div>
  )
}

export default CategoryPage;