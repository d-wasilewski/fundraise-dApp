import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import Protected from "../Protected";

const NavBar = () => {
    // const newFundraiserFlag = useContext(newFundraiserPopupFlag);
    const navigate = useNavigate();
    function navigateToAdminPage() {
        navigate("/admin");
    }
    return (
        <div className="navbar">
            <SearchBar className="search" />
            <Protected>
                <Button className="button" onClick={navigateToAdminPage}>
                    Admin page
                </Button>
            </Protected>
            <Button className="button">Connect wallet</Button>
        </div>
    );
};

export default NavBar;
