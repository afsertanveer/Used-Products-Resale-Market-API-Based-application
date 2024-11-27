import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';
import useTitle from './../../../../hooks/useTitle';

const MyOrders = () => {
    useTitle('My Orders');
    const {user} = useContext(AuthContext);
    const email = user?.email;
     const { data: booked = [] } = useQuery({
       queryKey: ["booked"],
       queryFn: async () => {
         const res = await fetch(`https://beche-fel-server.vercel.app/bookedPhone?email=${email}`);
         const data = await res.json();
         return data;
       },
     });
    return (
      <div>
        <h3 className="text-3xl">My Orders</h3>
        <div className="overflow-x-auto">
          <table className="table w-full mt-6">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {booked &&
                booked.map((booking, _idx) => (
                  <tr key={_idx}>
                    <th>{_idx + 1}</th>
                    <th>{booking.model}</th>
                    <td>{booking.askingPrice}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.location}</td>
                    <td>{booking.curDate}</td>
                    <td>
                      {booking.askingPrice && !booking.paid && (
                        <Link to={`/dashboard/payment/${booking.productId}`}>
                          <button className="btn btn-primary btn-sm">
                            Pay
                          </button>
                        </Link>
                      )}
                      {booking.askingPrice && booking.paid && (
                        <span className="text-success">Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyOrders;