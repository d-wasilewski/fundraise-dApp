import "./style.scss";
import Button from "../Button";
import SearchBar from "../SearchBar";

const NavBar = () => {
    return (
        <div className="navbar">
            <SearchBar className="search" />
            <Button className="button">Start new fundraiser</Button>
            <Button className="button">Connect wallet</Button>
        </div>
    );
};

export default NavBar;
