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
        <div>
            <h2>{product.name}</h2>

             {/* Slideshow container */}
<div className="slideshow-container">

   {/* Full-width images with number and caption text */}
  <div>
    <div>1 / 3</div>
    <img src={product.images[0]} alt="images" />
        <div>Caption Text</div>
  </div>

  <div>
    <div>2 / 3</div>
    <img src={product.images[1]} alt="images" />
    <div>Caption Two</div>
  </div>

  <div>
    <div>3 / 3</div>
    <img src={product.images[2]} alt="images" />
    <div>Caption Three</div>
  </div>

 {/* Next and previous buttons
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a> */}
</div>
<br />


 {/* The dots/circles */}
{/* <div>
  <span className="dot" onClick="currentSlide(1)"></span>
  <span className="dot" onClick="currentSlide(2)"></span>
  <span className="dot" onClick="currentSlide(3)"></span>
</div> */}
        
      
        
        <p>{product.description}</p>

        <p>${product.price}</p>


        {/* do an if statement for quantity vs parstock
         if under then low, if 0 then  out of stock*/}
        In Stock
        </div>
    )
};

export default SingleProduct;