import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';



const Register = () => {
    const { signInWithGoogle, setUser, createUser } = useContext(AuthContext)

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = e => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.imgURL.value;

        form.name.value = '';
        form.email.value = '';
        form.password.value = '';
        form.imgURL.value = '';

        if (password.length < 6) {
            setError('Your password is less than 6 character');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Your password should have one uppercase');
            return;
        }
        else if (!/[!@#$%^&*()_+\-=\[\]{}|;:'",<.>?/]/.test(password)) {
            setError('Your password should have at least one special character');
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                setSuccess('Successfully created user')

                updateProfile(loggedInUser, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        toast.success('profile updated');
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
                navigate(location?.state ? location.state : "/")

            })
            .catch(error => {
                toast.error(error.message);

            })

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                setSuccess('Google Signin Successful!');

                console.log(loggedInUser);

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div>
            <div className="my-20 w-3/4 p-4 bg-[#36aabe] rounded-lg mx-auto text-center">
                <h2 className="text-3xl font-bold my-10 text-[#ffffff]">Register</h2>

                <form onSubmit={handleRegister}>


                    <input type="text" name="name" id="name" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Name" required />


                    <input type="email" name="email" id="email" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Email" required />


                    <input type="password" name="password" className="border mx-auto p-4 block my-4 w-3/4" id="password" placeholder="Your Password" required />


                    <input type="text" name="imgURL" id="photo" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Image URL" />

                    <button className="btn bg-[#ffedc0]">Submit</button>

                    <p className="my-3 font-extrabold text-xl">Already have an account? Please <Link className="
                underline text-blue-700 font-bold" to='/login'>Login</Link> </p>

                </form>



                <p className="text-xl my-3 text-blue-700">Or</p>

                <button onClick={handleGoogleSignIn} className="btn mb-3  mt-4"><FcGoogle></FcGoogle>Login with Google</button>

            </div>

           <div className="text-center mb-5">
           {
                success ? <p className="text-green-500 font-bold">{success}</p> : <p className="text-red-500 font-bold">{error}</p>
            }
           </div>
        </div>
    );
};

export default Register;