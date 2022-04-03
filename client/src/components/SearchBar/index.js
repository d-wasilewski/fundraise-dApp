import "./style.scss";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = () => {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="search-bar-wrapper">
            <div className="search-bar">
                <input
                    className={`search-input ${hidden ? "hidden" : ""}`}
                    type="text"
                />
                <button
                    className="search-btn"
                    onClick={() => {
                        setHidden(!hidden);
                    }}
                >
                    <FaSearch className="search-icon" />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
