import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import MyProduct from './MyProduct';

const MyProducts = () => {
    const {user} = useContext(AuthContext);
    const url = `https://beche-fel-server.vercel.app/products?email=${user?.email}`;
       const { data: phones = [],refetch } = useQuery({
         queryKey: ["specialty"],
         queryFn: async () => {
           const res = await fetch(url);
           const data = await res.json();
           return data;
         },
       });
    return (
      <div>
        <h2 className='text-center text-3xl text-secondary font-extrabold my-10'>My Products</h2>
        <div className="mt-5 grid gap-4 p-4 grid-cols-1  lg:grid-cols-2">
          {phones.map((mobile) => (
            <MyProduct key={mobile._id} mobile={mobile}
            refetch={refetch}
            ></MyProduct>
          ))}
        </div>
      </div>
    );
};

export default MyProducts;