import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const DeleteProduct = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteProduct = () => {
    axios
      .delete(`http://localhost:3333/products/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div>
      <BackButton />
      <h1>Delete Product</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <h3>Are you sure you want to delete this product?</h3>
        <button onClick={handleDeleteProduct}>Yes, delete it</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
