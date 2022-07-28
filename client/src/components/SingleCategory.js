// import '../styles/Category.css';

const category = {
    name: "category1",
}

const products =[
    {
        id: 1,
    name: 'product1',
    image: '/images/product1-1',
    description: 'its a rake',
    price: 13
},
{
id: 1,
name: 'product2',
image: '/images/product2-1',
description: 'its NOT a rake',
price: 13
},
{
id: 1,
name: 'product3',
image: '/images/product1-1',
description: 'is it a rake',
price: 13
},
]


const SingleCategory = () => {
// call the query for category/product

    return(
        <div>
            <div>
               <h2>{category.name}</h2>
               </div>
               {products.map((product) => (
               
               <ul>
                   <li key={product.id}>
                   <div>
                       <div>
                           <h3>{[product.name]}</h3>
                           <div className='image'>{[product.image]}</div>
                           <p>{[product.description]}</p>
                           <p>${[product.price]}</p>
                       </div>
                       </div>
                       </li>
        </ul>
               ))}
         
       
        </div>
    )
}


export default SingleCategory;