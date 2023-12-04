import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState(null)
  const fetchProduct = async () => {
    setLoading(true)
    axios.get(`https://dummyjson.com/products`)
      .then((res) => setProducts(res.data.products))
      .catch(err => setError(err))
    .finally(()=> setLoading(false))
  }
  useEffect(() => { fetchProduct() },[])
  if (loading) return <>Loading...</>
  if (error) return <>{ error?.message}</>
  return (
    <div>
      <div className="cards-container">
   {products.map(({id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images}) => <div key={id} className='card'>
     <h3>{title}</h3>
     <img src={thumbnail} width="150" alt={title } />
     <p>$ { price}</p>
     <p>{description}</p>
     <div className='img-container' >{images.map((image, index) =><img key={index} src={ image} width='50' alt='images' />)}</div>
   </div>)}
 </div></div>
  );
}

export default App;
