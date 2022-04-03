import "./style.scss";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = ({ className }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <div className={`search-bar-wrapper ${className ? className : ""}`}>
            <div className="search-bar">
                <input
                    className={`search-input ${hidden ? "hidden" : ""}`}
                    type="text"
                    placeholder="Search..."
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
