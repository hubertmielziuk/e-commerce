import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSaveProduct = () => {
    const data = {
      name,
      description,
      price,
      category,
      image,
    };
    setLoading(true);
    axios
      .post("http://localhost:3333/products", data)
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
      <h1>Create Product</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleSaveProduct}>
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

export default CreateProduct;
