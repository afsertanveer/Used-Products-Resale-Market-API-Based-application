import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import useTitle from "../../../../hooks/useTitle";

const ReportedItems = () => {
  useTitle("Reported Items");

  const { data: phones = [], refetch } = useQuery({
    queryKey: ["phones"],
    queryFn: async () => {
      const res = await fetch(`https://beche-fel-server.vercel.app/products?isReported=true`);
      const data = await res.json();
      return data;
    },
  });
  const handleDelete = (id) => {
    fetch(`https://beche-fel-server.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
      
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Product is Deleted");
          refetch();
        }
      });
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
              <th>Modle</th>
              <th>Seller Name</th>

              <th>
                <span className="ml-4">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {phones &&
              phones.map((mobile, _idx) => (
                <tr key={_idx}>
                  <th>{_idx + 1}</th>
                  <th>{mobile.model}</th>
                  <td>{mobile.sellerName}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(mobile._id)}
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

export default ReportedItems;
