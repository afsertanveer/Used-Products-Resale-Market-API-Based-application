import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const BookPhone = ({ modalValues, setModalValues }) => {
  const { user } = useContext(AuthContext);
  const {model,askingPrice,_id} = modalValues;
  const navigate = useNavigate();
  function getDate(dateTime) {
    return `${dateTime.getDate()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`;
  }
  const curDate=getDate(new Date());
  const handleBooking = (event) => {
    
    event.preventDefault();
    const productId= _id;
    const email = user?.email;
    const form = event.target;
    const phone =form.phone.value;
    const location = form.location.value;
    const bookedPhone = {
      model,
      productId,
      askingPrice,
      email,
      phone,
      location,
      curDate
    };
    fetch("https://beche-fel-server.vercel.app/bookedPhone", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookedPhone),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product Booked Confirmed");
          setModalValues("");
          navigate("/dashboard/my-orders");
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{model}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
              className="input input-bordered w-full"
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="price"
              defaultValue={askingPrice}
              disabled
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="your phone number"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="your location"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="date"
              defaultValue={curDate}
              className="input input-bordered w-full"
              required
            />
            <br />
            <input
              className="w-full btn btn-primary"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookPhone;