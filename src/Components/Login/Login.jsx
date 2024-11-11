import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext, useState } from "react";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    form.email.value = "";
    form.password.value = "";

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password.Please try again!");
      });
  };

  return (
    <div className="my-20 w-3/4 p-4 bg-[#ff81c0] rounded-lg mx-auto text-center">
      <h2 className="text-3xl font-bold my-10 text-[#ffedc0]">Login</h2>

      <form onSubmit={handleLogIn}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border mx-auto p-4 block mb-4 w-3/4"
          required
        />

        <input
          type="password"
          name="password"
          className="border mx-auto p-4 block mb-4 w-3/4"
          placeholder="Password"
          required
        />

        <button className="btn bg-[#ffedc0]">Submit</button>

        <p className="mt-3 text-xl font-extrabold">
          New to our website? Please{" "}
          <Link
            className="
                underline text-blue-700 font-bold"
            to="/register"
          >
            Register
          </Link>{" "}
        </p>
      </form>

      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  );
};

export default Login;
