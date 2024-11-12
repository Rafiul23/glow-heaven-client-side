import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import Sticky from "react-stickynode";

const Navbar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const { user, logOut, name, photo } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then().catch();
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
        <NavLink
          to="/addProduct"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold underline"
              : ""
          }
        >
          Add Product
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myCart"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold underline"
              : ""
          }
        >
          My Cart
          <div className="badge badge-secondary ml-2">+0</div>
        </NavLink>
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
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            </div>
            <a className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent normal-case font-bold text-lg md:text-3xl">
              Glow Heaven
            </a>
          </div>
          
          <div className="navbar-end hidden lg:flex">
      
            <ul className="flex gap-4 px-1">{links}</ul>
            {user ? (
              <Link
                onClick={handleLogOut}
                className="btn bg-[#800] text-white p-2 rounded-lg mr-4"
              >
                LogOut
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn bg-[#800] text-white p-2 rounded-lg mr-4"
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
