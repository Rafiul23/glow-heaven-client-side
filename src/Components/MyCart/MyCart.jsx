import Cart from "../Cart/Cart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyCart = () => {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch(
      `https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/carts/${email}`
    )
      .then((res) => res.json())
      .then((data) => setCarts(data));
  }, [email]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {carts?.map((cart) => (
        <Cart
          carts={carts}
          setCarts={setCarts}
          key={cart._id}
          cart={cart}
        ></Cart>
      ))}
    </div>
  );
};

export default MyCart;
