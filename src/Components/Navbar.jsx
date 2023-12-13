import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { motion } from 'framer-motion';

const Navbar = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };


    const { user, logOut, name, photo } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const links = <>

        <li className='mt-3 mr-2'><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#36aabe] text-[#ffffff] font-bold p-3 rounded-lg " : "bg-[#FF81C0] p-3 rounded-lg text-white"
            }
        >Home</NavLink></li>

        <li className='mt-3 mr-2'><NavLink to='/addProduct'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#36aabe] text-white font-bold p-3 rounded-lg " : "bg-[#FF81C0] p-3 rounded-lg text-white"
            }
        >Add Product</NavLink></li>

        <li className='mt-3 mr-2'><NavLink to='/myCart'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#36aabe] text-white font-bold p-3 rounded-lg " : "bg-[#FF81C0] p-3 rounded-lg text-white"
            }
        >My Cart</NavLink></li>

        <li className='mt-3 mr-2'><NavLink to='/register'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#36aabe] text-white font-bold p-3 rounded-lg " : "bg-[#FF81C0] p-3 rounded-lg text-white"
            }
        >Register</NavLink></li>




    </>

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="navbar py-8 bg-[#000000]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            {links}

                        </ul>
                    </div>
                    <a className=" text-[#36aabe] normal-case font-bold text-lg md:text-3xl">Aesthetica</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1">

                        {links}

                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && <img className="rounded-full w-8 h-8 md:w-10 mr-3 md:h-10" src={user?.photoURL} />
                    }

                    {
                        user && <p className="text-white text-sm md:text-lg mr-3 font-bold">{user?.displayName}</p>
                    }

                    {
                        user ? <Link onClick={handleLogOut}
                            className="btn bg-[#5ebccd] text-white p-2 rounded-lg mr-4"
                        >LogOut</Link> :
                            <Link to='/login'
                                className="btn bg-[#5ebccd] text-white p-2 rounded-lg mr-4"
                            >Login</Link>
                    }

                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;