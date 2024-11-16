import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import registerImage from "../../assets/register.png";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_ImageBB_API_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser } = useAuth();
  const [hidden, setHidden] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Your password is less than 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Your password should have one uppercase");
      return;
    } else if (!/[!@#$%^&*()_+\-=\[\]{}|;:'",<.>?/]/.test(password)) {
      toast.error("Your password should have at least one special character");
      return;
    }

    const data = {image: imageFile};


    createUser(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        toast.success("Successfully created user");

       axiosPublic.post(image_hosting_api, data, {
          headers: {
               'Content-Type': 'multipart/form-data'
           }
     }).then(res =>{
      if(res.data.success){
        axiosPublic.post('/users', {
          email,
          name,
          photoURL: res.data.data.display_url,
          role: 'user'
        }).then(res =>{
          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "New user has been created",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${res.data.message}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        updateProfile(loggedInUser, {
          displayName: name,
          photoURL: res.data.data.display_url,
        })
          .then(() => {
            toast.success("profile updated");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
     });
      navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    form.name.value = "";
    form.email.value = "";
    form.password.value = "";
  };

  return (
    <div>
      <div className="py-10 bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 w-full shadow-xl">
            <form className="card-body" onSubmit={handleRegister}>
              <h2 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center py-6 font-bold">
                Please Register!
              </h2>
              <div className="my-4">
              <div className='form-control'>
            <label className="label">
                <span className="label-text">Your Image:</span>
              </label>
            <input type="file" onChange={e=> setImageFile(e.target.files[0])} className="file-input file-input-bordered w-full max-w-xs" required />
            </div>
            </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  name="name"
                  className="input input-bordered"
                  required
                  
                />
                
              </div>
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
                  Already have an account? Please,{" "}
                  <Link
                    to="/login"
                    className="text-[#800] font-bold underline"
                  >
                    Login!
                  </Link>{" "}
                </p>
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-[#ffdbac] text-[#800]">
                  Register
                </button>
              </div>
            </form>

            <div className="relative -top-[195px]">
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
          <div className="w-full flex justify-center items-center">
            <img
              src={registerImage}
              alt="signup image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
