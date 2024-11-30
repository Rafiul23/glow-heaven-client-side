import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaBook, FaCar, FaList, FaStar, FaUsers } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const {cart} = useCart();

    return (
        <div className="flex px-4 md:flex-row flex-col gap-4">
      <div className="w-64 p-4 min-h-screen bg-[#ffdbac]">
        <ul className="menu ">
          {
            isAdmin ? <>
            <li>
            <NavLink to="/dashboard/adminHome">
            <FaHome></FaHome>
            Admin Home
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/addProduct">
           <IoIosAddCircleOutline />
            Add Product
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageProducts">
           <FaList></FaList>
            Manage Products
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageOrders">
            <FaBook></FaBook>
            Manage Orders
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageUsers">
           <FaUsers></FaUsers>
            Manage Users
            </NavLink>
          </li>
            
            </> : <>
            <li>
            <NavLink to="/dashboard/userHome">
            <FaHome></FaHome>
            User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myOrder">
            <FaCar></FaCar>
            My Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
            <FaShoppingCart></FaShoppingCart>
             Cart {cart?.length}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
            <FaStar></FaStar>
            Add Review
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/paymentHistory">
           <FaList></FaList>
            Payment History
            </NavLink>
          </li>
            </>
          }
          {/* shared */}
        <div className="divider"></div>
        <li>
            <NavLink to="/">
            <FaHome></FaHome>
            Home
            </NavLink>
          </li>
        {/* <li>
            <NavLink to="/order/salad">
            <IoIosMenu></IoIosMenu> 
            Menu
            </NavLink>
          </li>
        <li>
            <NavLink to="/order/contact">
            <FaEnvelope />
            Contact
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
    );
};

export default Dashboard;