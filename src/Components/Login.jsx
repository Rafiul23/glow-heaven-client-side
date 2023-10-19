import { Link } from "react-router-dom";


const Login = () => {

    const handleLogIn = e =>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        e.target.email.value = '';
        e.target.password.value = '';
    }

    return (
        <div className="my-20 w-3/4 p-4 bg-[#ff81c0] rounded-lg mx-auto text-center">
             <h2 className="text-3xl font-bold my-10 text-[#ffedc0]">Please Login</h2>

            <form onSubmit={handleLogIn}>
                <input type="email" name="email" placeholder="Your Email" className="border mx-auto p-4 block mb-4 w-3/4" required />

                <input type="password" name="password" className="border mx-auto p-4 block mb-4 w-3/4" placeholder="Password" required />

                <button className="btn bg-[#ffedc0]">Submit</button>

                <p className="mt-3 text-xl font-extrabold">New to our website? Please <Link className="
                underline text-blue-700 font-bold" to='/register'>Register</Link> </p>
            </form>

        </div>
    );
};

export default Login;