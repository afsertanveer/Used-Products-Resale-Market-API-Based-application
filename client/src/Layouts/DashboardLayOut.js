import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import { AuthContext } from './../Context/AuthProvider';
import useRole from './../hooks/useRole';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
    const {role} =useRole(user?.email);
    let userRole;
    if(!role){
      userRole='user';
    }
    else{
      userRole=role;
    }
  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 bg-white text-base-content">
            {userRole === "admin" && (
              <>
                <li>
                  <Link to="sellers">All sellers</Link>
                </li>
                <li>
                  <Link to="buyers">All buyers</Link>
                </li>
                <li>
                  <Link to="reported-items">Reported Items</Link>
                </li>
              </>
            )}
            {userRole === "user" && (
              <>
                <li>
                  <Link to="my-orders">My Orders</Link>
                </li>
              </>
            )}
            {userRole === "seller" && (
              <>
                <li>
                  <Link to="add-product">Add a Product</Link>
                </li>
                <li>
                  <Link to="my-products">My Products</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;