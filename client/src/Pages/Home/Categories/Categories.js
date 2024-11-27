import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../Loader/Loader';

const Categories = () => {

  const { data: brands = [],isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
    const res = await fetch("https://beche-fel-server.vercel.app/categories");
    const data = await res.json();
    return data;
    },
  });
  if(isLoading){
    return <Loader></Loader>
  }
    return (
      <div className="my-10">
        <h1 className="text-4xl tex-center text-secondary text-center font-extrabold">
          Categories
        </h1>
        <div className="my-8 flex justify-center items-center">
          <div className="grid gap-5 grid-cols-3">
            {brands.map((brand) => (
              <Link to={`/categories/${brand.name}`} key={brand._id}>
                <button className="p-5 w-full btn btn-lg bg-secondary text-white font-semibold mr-3 lg:w-96 lg:h-24 lg:text-3xl  ">
                  {brand.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Categories;