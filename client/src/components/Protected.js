import { FundraisingContext } from "../context/FundraisingContext";
import { useContext } from "react";
import { adminList } from "../admins";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    let check = false;
    const { connectedAccount } = useContext(FundraisingContext);
    adminList.forEach((admin) => {
        if (admin.toLowerCase() == connectedAccount.toLowerCase()) {
            check = true;
        }
    });
    return check ? children : <Navigate to="/" replace />;
};

export default Protected;
