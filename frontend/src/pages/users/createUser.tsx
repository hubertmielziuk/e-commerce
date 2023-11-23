import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSaveUser = () => {
    const data = {
      username,
      email,
      password,
      firstName,
      lastName,
    };
    setLoading(true);
    axios
      .post("http://localhost:3333/users", data)
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
      <h1>Create User</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleSaveUser}>
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

export default CreateUser;
