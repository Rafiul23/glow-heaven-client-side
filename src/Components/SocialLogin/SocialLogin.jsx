import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {

    const {signInWithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
          .then((result) => {
            const currentUser = result.user;
            console.log(currentUser);
            const userInfo = {
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: 'user'
            };
            axiosPublic.post('/users', userInfo)
            .then(res =>{
              if(res.data.insertedId){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "New user created successfully",
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
            toast.success("Google Signin Successful!");
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };

    return (
        <div>
          <button onClick={handleGoogleSignIn} className="btn mb-3  mt-4">
          <FcGoogle></FcGoogle> Login with Gmail
        </button>  
        </div>
    );
};

export default SocialLogin;