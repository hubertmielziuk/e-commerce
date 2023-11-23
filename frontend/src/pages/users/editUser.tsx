import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/users/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditUser = () => {
    const data = {
      username,
      email,
      password,
      firstName,
      lastName,
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
      <h1>Edit User</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleEditUser}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label>First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditUser;
