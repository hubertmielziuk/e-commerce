import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setImage(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditProduct = () => {
    const data = {
      name,
      description,
      price,
      category,
      image,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3333/products/${id}`, data)
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
      <h1>Edit Product</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleEditProduct}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          ></input>
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProduct;
