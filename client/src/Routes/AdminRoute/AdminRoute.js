import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../../hooks/useRole";
import Loader from "../../Loader/Loader";
import { AuthContext } from "./../../Context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { role } = useRole(user?.email);

  if (loading) {
    return <Loader></Loader>;
  }
  if (user && role!=='user' && role!=='seller') {
    console.log(role);
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
