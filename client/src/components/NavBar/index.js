import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useContext } from "react";

const NavBar = () => {
    // const newFundraiserFlag = useContext(newFundraiserPopupFlag);
    return (
        <div className="navbar">
            <SearchBar className="search" />
            <Button className="button">Start new fundraiser</Button>
            <Button className="button">Connect wallet</Button>
        </div>
    );
};

export default NavBar;
