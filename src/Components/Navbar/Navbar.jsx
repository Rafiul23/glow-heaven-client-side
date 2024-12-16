import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Sticky from "react-stickynode";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const {cart} = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  
  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold underline"
              : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
      {
        user && <NavLink
        to={ isAdmin ? `/dashboard/adminHome` : `/dashboard/userHome`}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold underline"
            : ""
        }
      >
        Dashboard
      </NavLink>
      } 
      </li>

      <li>
        { user && <NavLink
          to="/dashboard/cart"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold underline"
              : ""
          }
        >
          Cart
          <div className="badge badge-secondary ml-2">+{cart?.length}</div>
        </NavLink>}
      </li>

      <li>
        <NavLink
          to="/register"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent underline font-bold"
              : ""
          }
        >
          Register
        </NavLink>
      </li>
      
    </>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Sticky enabled={true} innerZ={10}>
        <div className="navbar py-4 bg-[#FFDBAC]">
          <div className="navbar-start">
            <div className="dropdown mr-2 lg:hidden">
              
                <button onClick={()=> setIsOpen(!isOpen)}>
                {
                  isOpen ? <IoMdClose /> : <AiOutlineMenu />
                }
                </button>
              
              <ul
                tabIndex={0}
                className={ isOpen ? `menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52` : `hidden`}
              >
                {links}
              </ul>
            </div>
            <a className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent normal-case font-bold text-lg md:text-3xl">
              Glow Heaven
            </a>
          </div>
          
          <div className="navbar-center hidden lg:flex">
      
            <ul className="flex gap-6 px-1">{links}</ul>
           
          </div>
          <div className="navbar-end">
            <div>
              {
                user && <div className="flex items-center gap-4">
                  <img className="w-[40px] h-[40px] rounded-full border-2" src={user?.photoURL} alt={user?.displayName} />
                  <p>{user?.displayName}</p>
                </div>
              }
            </div>
          {user ? (
              <Link
                onClick={handleLogOut}
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 text-white rounded-lg ml-4"
              >
                LogOut
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 text-white rounded-lg ml-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Sticky>
    </motion.div>
  );
};

export default Navbar;
