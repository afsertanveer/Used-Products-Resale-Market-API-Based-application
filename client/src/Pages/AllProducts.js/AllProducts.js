import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import useRole from './../../hooks/useRole';
import useTitle from './../../hooks/useTitle';
import BookPhone from './../BookPhone/BookPhone';
import CategoryProduct from './../CategoryProducts/CategoryProduct';

const AllProducts = () => {
  useTitle('All Products')
  const [phones,setPhones] = useState([]);
   axios.get(`https://beche-fel-server.vercel.app/products/`)
   .then((res) => {
     setPhones(res.data);
   });
   const mobiles =phones?.filter(ph=>!ph.isSold);
  const {user} = useContext(AuthContext)

    const [modalValues, setModalValues] = useState("");

         const { role } = useRole(user?.email);
         let userRole;
         if (!role && user) {
           userRole = "user";
         } else {
           userRole = role;
         }
           const setModalValue = (id, booked) => {
             let value = "";
             if (booked) {
               toast.error("This item is already booked");
             } else {
               value = phones?.find((phone) => phone._id === id);
               console.log(value);
             }
             if (user) {
               if (userRole !== "user") {
                 toast.error("This account not for booking");
                 setModalValues("");
               } else {
                 setModalValues(value);
               }
             } else {
               toast.error("Register/Login to book");
             }
           };
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-center">ALL PRODUCTS</h2>
      <div className="mt-5 grid gap-4 p-4 grid-cols-1 lg:grid-cols-2">
        {mobiles?.map((mobile) => (
          <CategoryProduct
            key={mobile._id}
            setModalValue={setModalValue}
            mobile={mobile}
          ></CategoryProduct>
        ))}
      </div>
      {modalValues && (
        <BookPhone
          setModalValues={setModalValues}
          modalValues={modalValues}
        ></BookPhone>
      )}
    </div>
  );
};

export default AllProducts;