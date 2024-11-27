import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import Loader from '../../../Loader/Loader';
import { AuthContext } from './../../../Context/AuthProvider';

const Registration = () => {
    useTitle('Sign Up')
     const {loading, createUser, updateUser } = useContext(AuthContext);
     const {register, handleSubmit,formState:{errors}}=useForm()
     const imageHostKey = process.env.REACT_APP_imgbb_key;
     const navigate =useNavigate();
     const location = useLocation();
     const from = location.state?.from.pathname || "/";
     const formData = new FormData();
     console.log(imageHostKey);
     const [signUpError, setSignUpError] = useState("");
    const handleSignUp = (data) =>{
        console.log(data);
        const image = data.img[0];
        formData.append('image',image);
        setSignUpError('');
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
        .then(res=>res.json())
        .then(imgData=>{
          if(imgData.success){
            const user = {
              displayName: data.name,
              email: data.email,
              photoURL: imgData.data.url,
              role:data.role
            };
            const profile={
              displayName:data.name,
              photoURL:user.photoURL
            }
            createUser(data.email,data.password)
            .then(result=>{
              updateUser(profile)
              .then(()=>{})
              .catch(error=>console.log(error))
              //save user
              const user =result?.user;
              const currentUser = {
                email: user?.email,
              };
              fetch("https://beche-fel-server.vercel.app/jwt", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(currentUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  localStorage.setItem("token", data.token);
                  navigate(from, { replace: true });
                });
              fetch("https://beche-fel-server.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(user),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.acknowledged) {
                    setSignUpError('');
                    toast.success("Registration Successful");
                    navigate('/');
                  }
                });
            })
            .catch(error=>{
              setSignUpError(error.message)
            })

          }

        })

      }
      if(loading && !signUpError){
        return <Loader></Loader>
      }
    return (
      <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-xl text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              {errors.name && (
                <p className="text-error">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-error">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password lenght has to be six minimum",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message: "Password must be strong",
                  },
                })}
              />
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
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
                <span className="label-text">You are</span>
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="radio-1"
                  defaultValue="user"
                  className="radio radio-primary mr-2"
                  defaultChecked
                  {...register("role", {})}
                />
                User
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="radio-1"
                  defaultValue="seller"
                  className="radio radio-primary mr-2"
                  {...register("role", {})}
                />
                Seller
              </label>
            </div>
            <input
              className="btn btn-secondary text-white font-semibold w-full mt-4"
              value="Sign Up"
              type="submit"
            />
            {signUpError && <p className="text-error">{signUpError}</p>}
          </form>
          <p>
            Already have an acoount?
            <Link to="/login" className="text-error underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
}
export default Registration;