import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const DeleteUser = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:3333/users/${id}`)
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
      <h1>Delete User</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <h3>Are you sure you want to delete this user?</h3>
        <button onClick={handleDeleteUser}>Yes, delete it</button>
      </div>
    </div>
  );
};

export default DeleteUser;
