import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    // const newFundraiserFlag = useContext(newFundraiserPopupFlag);
    const navigate = useNavigate();
    function navigateToAdminPage() {
        navigate("/admin");
    }
    return (
        <div className="navbar">
            <SearchBar className="search" />
            <Button className="button" onClick={navigateToAdminPage}>
                Admin page
            </Button>
            <Button className="button">Connect wallet</Button>
        </div>
    );
};

export default NavBar;
