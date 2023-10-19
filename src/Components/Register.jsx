import { Link } from "react-router-dom";


const Register = () => {

    const handleRegister = e =>{
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
    }

    return (
        <div className="my-20 w-3/4 p-4 bg-[#ff81c0] rounded-lg mx-auto text-center">
            <h2 className="text-3xl font-bold my-10 text-[#ffedc0]">Please Register</h2>

            <form onSubmit={handleRegister}>

           
                <input type="text" name="name" id="name" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Name" required />

               
                <input type="email" name="email" id="email" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Email" required />

               
                <input type="password" name="password" className="border mx-auto p-4 block my-4 w-3/4" id="password" placeholder="Your Password" required />

               
                <input type="text" name="imgURL" id="photo" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Your Image URL" />

                <button className="btn bg-[#ffedc0]">Submit</button>

                <p className="my-3 font-extrabold text-xl">Already have an account? Please <Link className="
                underline text-blue-700 font-bold" to='/login'>Login</Link> </p>

            </form>

        </div>
    );
};

export default Register;