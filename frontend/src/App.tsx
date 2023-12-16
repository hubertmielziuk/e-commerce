import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowProduct from "./pages/products/ShowProduct";
import EditProduct from "./pages/products/EditProduct";
import DeleteProduct from "./pages/products/DeleteProduct";
import CreateProduct from "./pages/products/CreateProduct";
import ShowUser from "./pages/users/ShowUser";
import EditUser from "./pages/users/EditUser";
import DeleteUser from "./pages/users/DeleteUser";
import CreateUser from "./pages/users/CreateUser";
import ChangePassword from "./pages/users/ChangePassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/products/details/:id" element={<ShowProduct />} />
      <Route path="/products/delete/:id" element={<DeleteProduct />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/users/details/:id" element={<ShowUser />} />
      <Route path="/users/delete/:id" element={<DeleteUser />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/users/:id/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default App;
