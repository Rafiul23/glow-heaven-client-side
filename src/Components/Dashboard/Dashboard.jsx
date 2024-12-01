import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBook, FaCar, FaList, FaStar, FaUsers } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-row md:gap-4">
      {/* Sidebar/Menu */}
      <div className="relative">
        {/* Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-2xl"
          onClick={handleToggleMenu}
        >
          {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
        </button>

        {/* Menu Content */}
        <div
          className={`fixed top-0 left-0 w-64 p-4 min-h-screen bg-[#ffdbac] shadow-lg transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:translate-x-0`}
        >
          <ul className="menu space-y-4 max-md:mt-6">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome className="mr-2" /> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addProduct">
                    <IoIosAddCircleOutline className="mr-2" /> Add Product
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageProducts">
                    <FaList className="mr-2" /> Manage Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageOrders">
                    <FaBook className="mr-2" /> Manage Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers">
                    <FaUsers className="mr-2" /> Manage Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome className="mr-2" /> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myOrder">
                    <FaCar className="mr-2" /> My Order
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cart">
                    <FaShoppingCart className="mr-2" />
                    Cart <span className="badge">{cart?.length}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/review">
                    <FaStar className="mr-2" /> Add Review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <FaList className="mr-2" /> Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* Shared Links */}
            <div className="divider" />
            <li>
              <NavLink to="/">
                <FaHome className="mr-2" /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-md:mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
