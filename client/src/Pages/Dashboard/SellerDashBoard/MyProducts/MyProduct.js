import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useTitle from './../../../../hooks/useTitle';

const MyProduct = ({ mobile, refetch }) => {
  useTitle("My Products");
  const {
    photoURL,
    _id,
    brand,
    model,
    conditon,
    askingPrice,
    purchasedPrice,
    purchasedYear,
    location,
    phone,
    isAdvertised,
    isSold,
  } = mobile;
  const navigate = useNavigate();
  const handleAdvertise = (id) => {
    fetch(`https://beche-fel-server.vercel.app/product/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully advertised to the home page");
          navigate("/");
        }
      });
  };
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure? You want to Delete");
    if(proceed){
      fetch(`https://beche-fel-server.vercel.app/products/${id}`, {
        method: "DELETE",
        headers: {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Product is Deleted");
            refetch();
          }
        });
    }
  };
  return (
    <div className="card px-2 bg-base-100 shadow-xl">
      <div className="flex flex-col justify-center items-center lg:flex-row md:flex-row">
        <figure className="ml-4">
          <img src={photoURL} className="w-64 h-96" alt="Shoes" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-3xl font-extrabold text-primary">
            {model}
          </h2>
          <div className="flex justify-between items-center">
            <div className="text-xl text-blue-400">
              <p>Company: {brand}</p>
              <p>Asking Price: {askingPrice}</p>
              <p>Purchased Price: {purchasedPrice}</p>
              <p>Buying Date:{purchasedYear}</p>
              <p>Location: {location}</p>
              <p>Phone: {phone}</p>
              <p>Condition: {conditon}</p>
            </div>
          </div>
          {isSold ? (
            <h2 className="text-3xl font-semibold text-error">Status: Sold</h2>
          ) : (
            <h2 className="text-3xl font-semibold text-success">
              Status: Available
            </h2>
          )}
        </div>
      </div>
      <div className="card-actions justify-end my-4">
        {!isAdvertised && !isSold && (
          <label
            onClick={() => handleAdvertise(_id)}
            className="btn w-28 btn-outline "
          >
            Advertise
          </label>
        )}

        <button
          onClick={() => handleDelete(_id)}
          className="btn w-28 rounded-lg btn-error text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyProduct;