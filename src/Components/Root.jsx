import { Outlet } from "react-router-dom";
import Nvabar from "./Nvabar";


const Root = () => {
    return (
        <div>
            <Nvabar></Nvabar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;