import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { adminList } from "../../admins";
import { FundraisingContext } from "../../context/FundraisingContext";

const NavBar = () => {
    // const newFundraiserFlag = useContext(newFundraiserPopupFlag);
    const { connectedAccount } = useContext(FundraisingContext);

    const navigate = useNavigate();
    function navigateToAdminPage() {
        navigate("/admin");
    }

    const checkAdmin = () => {
        adminList.forEach((admin) => {
            if (admin.toLowerCase() == connectedAccount.toLowerCase()) {
                return true;
            }
        });
        return false;
    };

    return (
        <div className="navbar">
            <SearchBar className="search" />
            {checkAdmin() && (
                <Button className="button" onClick={navigateToAdminPage}>
                    Admin page
                </Button>
            )}
            <Button className="button">Connect wallet</Button>
        </div>
    );
};

export default NavBar;
