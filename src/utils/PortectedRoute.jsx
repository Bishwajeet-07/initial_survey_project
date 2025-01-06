import { useSelector } from "react-redux";

import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    let user = useSelector((state) => state.user);
    return user ? <Outlet /> : <Navigate to="/personal_information" />
}

export default ProtectedRoute;