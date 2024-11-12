import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import loginImage from '../../assets/login.png';
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  const handleLogin = (e) => {
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
    <div className="py-10 bg-base-200">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full flex justify-center items-center">
        <img src={loginImage} alt="login image" width={500} height={500} />
      </div>
      <div className="card bg-base-100 w-full shadow-xl">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="text-3xl text-center py-6 font-bold">
            Login Now!
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={hidden ? "password" : "text"}
              placeholder="Password"
              name="password"
              className="input input-bordered"
              required
            />
            <p className="pt-6">
              New to Bistro Boss? Please,{" "}
              <Link
                to="/signup"
                className="text-[#800] font-bold underline"
              >
                Sign Up!
              </Link>{" "}
            </p>
          </div>
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              type="text"
              onBlur={handleValidateCaptcha}
              placeholder="Type the captcha above"
              name="captcha"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              disabled={disabled}
              className="btn bg-[#ffdbac] text-[#800]"
            >
              Login
            </button>
          </div>
        </form>

        <div className="relative -top-[360px]">
          <div className="absolute right-16">
            <button onClick={() => setHidden(!hidden)}>
              {hidden ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </button>
          </div>
        </div>
        <p className="text-center my-2 divider">Or</p>
      <div className="py-5 text-center">
        <SocialLogin></SocialLogin>
      </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
