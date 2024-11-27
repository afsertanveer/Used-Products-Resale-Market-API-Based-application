import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import useTitle from '../../../../hooks/useTitle';

const AllSellers = () => {
    useTitle('All Sellers');
    
    const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const res = await fetch(`https://beche-fel-server.vercel.app/users?role=seller`);
        const data = await res.json();
        return data;
    },
    });
    const handleVerify = email =>{
        
         fetch(`https://beche-fel-server.vercel.app/users/${email}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({})
        })
        .then(res=>res.json())
        .then(data=>{
             if(data.acknowledged){
            toast.success('Seller is verified');
            refetch();
        }
        })
    }
      const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure? You want to Delete");
        if (proceed) {
          fetch(`https://beche-fel-server.vercel.app/users/${id}`, {
            method: "DELETE",
            headers: {},
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                toast.success("Buyer is Deleted");
                refetch();
              }
            });
        }
      };
    return (
      <div>
        <h2 className="text-3xl text-center text-secondary font-extrabold">
          All Buyers
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full mt-6">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>
                  <span className="ml-4">Verify</span>
                </th>
                <th>
                  <span className="ml-4">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((u, _idx) => (
                  <tr key={_idx}>
                    <th>{_idx + 1}</th>
                    <th>{u.displayName}</th>
                    <td>{u.email}</td>
                    <td>
                      {u.isVerified ? (
                        <p className="text-success">Verified</p>
                      ) : (
                        <button
                          onClick={() => handleVerify(u.email)}
                          className="btn btn-outline"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllSellers;