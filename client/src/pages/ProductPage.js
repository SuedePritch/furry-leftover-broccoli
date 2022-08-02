import React from "react";
import SingleProduct from "../components/SingleProduct";
import Cart from "../components/Cart";


const productPage = () => {
  return (
    <div className="container">
      <SingleProduct/>
      <Cart/>
    </div>
  )
}

export default productPage;