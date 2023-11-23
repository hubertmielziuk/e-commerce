import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Spinner from "../../components/Spinner.jsx";

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

const ShowUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Show User</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Id</span>
            <span>{user?._id}</span>
          </div>

          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Username</span>
            <span>{user?.username}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Firstname</span>
            <span>{user?.firstName}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Lastname</span>
            <span>{user?.lastName}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Created At</span>
            <span>{user?.createdAt.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
