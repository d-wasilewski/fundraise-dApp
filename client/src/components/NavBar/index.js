import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FundraisingContext } from "../../context/FundraisingContext";
import { adminList } from "../../admins";

const NavBar = () => {
    const { connectWallet, connectedAccount } = useContext(FundraisingContext);
    const navigate = useNavigate();

    function navigateToAdminPage() {
        navigate("/admin");
    }

    let check = false;

    if (connectedAccount) {
        adminList.forEach((admin) => {
            if (admin.toLowerCase() == connectedAccount.toLowerCase()) {
                check = true;
            }
        });
    }

    return (
        <div className="navbar">
            <SearchBar className="search" />
            {check && (
                <Button className="button" onClick={navigateToAdminPage}>
                    Admin page
                </Button>
            )}
            <Button className="button" onClick={connectWallet}>
                {connectedAccount
                    ? connectedAccount.slice(0, 5) +
                      "..." +
                      connectedAccount.slice(-5)
                    : "Connect wallet"}
            </Button>
        </div>
    );
};

export default NavBar;
