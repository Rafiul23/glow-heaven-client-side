import { useLoaderData } from "react-router-dom";
import Cart from "./Cart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";


const MyCart = () => {

    const {user} = useContext(AuthContext);
    const [carts, setCarts] = useState([]);
    const email = user.email;

   useEffect(()=>{
    fetch(`http://localhost:5000/carts/${email}`)
    .then(res => res.json())
    .then(data => setCarts(data))
   },[email])

   console.log(carts);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                carts?.map(cart => <Cart key={cart._id} cart={cart}></Cart>)
            }
        </div>
    );
};

export default MyCart;