import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import useRole from '../../../hooks/useRole';
import BookPhone from '../../BookPhone/BookPhone';
import CategoryProduct from '../../CategoryProducts/CategoryProduct';
import { AuthContext } from './../../../Context/AuthProvider';

const HomeAdvertise = () => {
    const {user} = useContext(AuthContext);
       const [modalValues, setModalValues] = useState("");
    const { data: phones = [] } = useQuery({
      queryKey: ["phone"],
      queryFn: async () => {
        const res = await fetch("https://beche-fel-server.vercel.app/products");
        const data = await res.json();
        return data;
      },
    });
    const count = phones.filter(ph=>ph.isAdvertised==='true' && ph.booked!=='true');
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
        {count.length > 0 && (
          <div className="my-10">
            <h1 className="text-4xl font-extrabold text-center text-secondary mb-5">
              Advertisement
            </h1>
          </div>
        )}
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
          {count.map((mobile) => (
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

export default HomeAdvertise;