import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
const CategoryProduct = ({ mobile, setModalValue }) => {
  const {user} = useContext(AuthContext)
  const [curUser,setCurUser] = useState('');
  const navigate = useNavigate()
  const {
    _id,
    photoURL,
    brand,
    model,
    conditon,
    askingPrice,
    purchasedPrice,
    purchasedYear,
    location,
    phone,
    booked,
    sellerName,
    addedBy,
    isReported
  } = mobile;
 

   useEffect(() => {
     fetch(`https://beche-fel-server.vercel.app/users?email=${addedBy}`)
       .then((res) => res.json())
       .then((data) => {
        setCurUser(data);
       });
   }, [addedBy]);
   let verifyUser;
   if(curUser){
    
       verifyUser = curUser.find((c) => c.isVerified === "true");
   }
  
   const reportAdmin = (id,booked)=>{
    if(booked){
      toast.error('This item is already booked.You cannot report it');
    }else{
      fetch(`https://beche-fel-server.vercel.app/products/report/${id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({})

      })
      .then(res=>res.json())
      .then(data=>{
        if(data.acknowledged){
          toast.error('Reported to Admin')
          navigate('/dashboard');
        }
      })
    }
   }
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
             <div className="text-xl text-gray-700">
               <p>Company: {brand}</p>
               <p>Asking Price: {askingPrice}</p>
               <p>Purchased Price: {purchasedPrice}</p>
               <p>Buying Date:{purchasedYear}</p>
               <p>Location: {location}</p>
               <p className="flex">
                 Seller Name: {sellerName}{" "}
                 {verifyUser && (
                   <FaUserCheck className="text-blue-600 ml-1 "></FaUserCheck>
                 )}
               </p>
               <p>Phone: {phone}</p>
               <p>Condition: {conditon}</p>
             </div>
           </div>
         </div>
       </div>
       <div className="flex justify-center items-center my-10">
         <div className="mr-4">
           <label
             onClick={() => setModalValue(_id, booked)}
             htmlFor="booking-modal"
             className="btn w-40 btn-success "
           >
             Book Now
           </label>
         </div>
         {user && (
           <div className="card-actions justify-center my-4">
             {isReported ? (
               <h2 className="text-xl text-error font-semibold">Reported</h2>
             ) : (
               <button
                 onClick={() => reportAdmin(_id, booked)}
                 className="btn btn-error"
               >
                 Report To Admin
               </button>
             )}
           </div>
         )}
       </div>
     </div>
   );
};

export default CategoryProduct;