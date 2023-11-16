import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
}

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3333/products")
      .then((response) => {
        setProducts(response.data);
        // response.data.data?
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to Our Store</h1>
      {loading ? (
        <div>
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <img src={product.image} alt={product.name}></img>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Link to={`/products/${product._id}`}> View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
