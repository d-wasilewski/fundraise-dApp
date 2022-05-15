import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import Protected from "../Protected";
import { useContext } from "react";
import { FundraisingContext } from "../../context/FundraisingContext";

const NavBar = () => {
    const { connectWallet, connectedAccount } = useContext(FundraisingContext);
    const navigate = useNavigate();
    function navigateToAdminPage() {
        navigate("/admin");
    }
    console.log(connectedAccount);
    return (
        <div className="navbar">
            <SearchBar className="search" />

            <Button className="button" onClick={navigateToAdminPage}>
                Admin page
            </Button>

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
