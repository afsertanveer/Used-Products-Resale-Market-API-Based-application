import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';
import useTitle from './../../../../hooks/useTitle';


const AddProduct = () => {
  useTitle('Add Product');
    const {user} = useContext(AuthContext)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const imageHostKey = "ebd4060c9b00b8b0232d789d6ffbf217";
     const formData = new FormData();
        const { data: brands = [] } = useQuery({
          queryKey: ["mobiles"],
          queryFn: async () => {
            const res = await fetch("https://beche-fel-server.vercel.app/categories");
            const data = await res.json();
            return data;
          },
        });
     const handlePrdouct = (data) => {
       const image = data.img[0];
       formData.append("image", image);
       const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
       fetch(url, {
         method: "POST",
         body: formData,
       })
         .then((res) => res.json())
         .then((imgData) => {
           if (imgData.success) {
             const phone = {
               model: data.model,
               brand: data.brand,
               photoURL: imgData.data.url,
               askingPrice:data.askingPrice,
               purchasedPrice:data.purchasedPrice,
               conditon:data.conditon,
               purchasedYear:data.purchasedYear,
               phone: data.phone,
               location: data.location,
               addedBy:user?.email,
               sellerName:user?.displayName,
               isVerified:false
             };

             //save phone information to the database
             fetch("https://beche-fel-server.vercel.app/products", {
               method: "POST",
               headers: {
                 "content-type": "application/json",
               },
               body: JSON.stringify(phone),
             })
               .then((res) => res.json())
               .then((result) => {
                 if (result.acknowledged) {
                   toast.success("A product added successfully");
                   navigate("/dashboard/my-products");
                 }
               });
           }
         });
     };
    return (
      <div className='flex justify-center items-center'>
        <div className="w-96 p-7">
          <h2 className="text-4xl text-center">Add A Phone</h2>
          <form onSubmit={handleSubmit(handlePrdouct)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Model</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("model", {
                  required: "Model is Required",
                })}
              />
              {errors.model && (
                <p className="text-error">{errors.model?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <select
                defaultValue='Iphone'
                className="select select-bordered w-full max-w-xs"
                {...register("brand")}
              >
                {brands.map((brand) => (
                  <option key={brand._id} defaultValue={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                className="input input-bordered w-full max-w-xs"
                {...register("img", {
                  required: "Photo is Required",
                })}
              />
              {errors.name && (
                <p className="text-error">{errors.img?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Asking Price</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("askingPrice", {
                  required: "Asking Price is required",
                })}
              />
              {errors.askingPrice && (
                <p className="text-error">{errors.askingPrice?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Purchased Price</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("purchasedPrice", {
                  required: "Purchased Price is required",
                })}
              />
              {errors.purchasedPrice && (
                <p className="text-error">{errors.purchasedPrice?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Conditon</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("conditon", { required: "Conditon is required" })}
              />
              {errors.conditon && (
                <p className="text-error">{errors.conditon?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Purchased Year</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                {...register("purchasedYear", {
                  required: "Purchased Year is required",
                })}
              />
              {errors.conditon && (
                <p className="text-error">{errors.conditon?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("phone", {
                  required: "Mobile Number is required",
                })}
              />
              {errors.phone && (
                <p className="text-error">{errors.phone?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("location", {
                  required: "Mobile Number is required",
                })}
              />
              {errors.phone && (
                <p className="text-error">{errors.phone?.message}</p>
              )}
            </div>

            <input
              className="btn btn-accent w-full mt-4"
              defaultValue="Add Doctor"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
};

export default AddProduct;