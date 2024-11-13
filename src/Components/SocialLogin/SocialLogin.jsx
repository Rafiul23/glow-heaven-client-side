import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const {signInWithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
          .then((result) => {
            const loggedInUser = result.user;
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