import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

interface IProduct {
    _id: string,
    name: string;
    description?: string;
    price: number;
    category: string;
    image: string;
    createdAt: Date;
  }

const showProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Show product</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Id</span>
            <span>{product?._id}</span>
          </div>

          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Name</span>
            <span>{product?.name}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Description</span>
            <span>{product?.description}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Price</span>
            <span>{product?.price}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Category</span>
            <span>{product?.category}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Image</span>
            <span>{product?.image}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Created At</span>
            <span>{product?.createdAt.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default showProduct;
