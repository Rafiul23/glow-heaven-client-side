import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="mx-auto mt-40 space-y-4 text-center">
            <h2 className="text-3xl font-bold">Oppss!!!</h2>
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="text-2xl">Page not found or the products of this brand is not available</p>
            <Link to="/"><button className="btn mt-5 btn-warning">Go back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;