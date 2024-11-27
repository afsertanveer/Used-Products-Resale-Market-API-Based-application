import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useRole from './../../hooks/useRole';
import useTitle from './../../hooks/useTitle';
import BookPhone from './../BookPhone/BookPhone';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {
    const {user} = useContext(AuthContext);
    const phones = useLoaderData();
    const mobiles = phones?.filter((ph) => !ph.isSold);
    const [modalValues,setModalValues] = useState('');
    const brand = phones.map(ph=> ph.brand);
   
      useTitle(brand[0]? brand[0] : 'Category');
   
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
         value = phones.find((phone) => phone._id === id);
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
        <div className="mt-5 grid gap-4 p-4 grid-cols-1  lg:grid-cols-2">
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
            modalValues={modalValues}
            setModalValues={setModalValues}
          ></BookPhone>
        )}
      </div>
    );
};

export default CategoryProducts;