import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import PhotosPage from "./containers/PhotosPage/PhotosPage";
import UserPhotosPage from "./containers/UserPhotoPage/UserPhotoPage";
import AddPhotoPage from "./containers/AddPhotoPage/AddPhotoPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PhotosPage />} />
        <Route path="/users/:id" element={<UserPhotosPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-photo" element={<AddPhotoPage />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
};

export default App;