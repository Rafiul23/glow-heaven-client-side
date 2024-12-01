import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({children}) => {

    const [isAdmin, isLoading] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if(loading || isLoading){
        return <progress className="progress progress-success w-56" ></progress>;
    }

    if(user && isAdmin){
        return children;
     } else {
         return <Navigate state={{from: location}} replace to='/'></Navigate>
     }
};

export default AdminRoute;