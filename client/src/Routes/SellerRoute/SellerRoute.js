import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useRole from './../../hooks/useRole';
import Loader from './../../Loader/Loader';

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
   const { role } = useRole(user?.email);
   let userRole;
   if (!role) {
     userRole = "user";
   } else {
     userRole = role;
   }
  if(loading){
    return <Loader></Loader>
  }
  if (userRole && user) {
    return  children ;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;