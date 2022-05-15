import { createContext, useContext, useState } from "react";
import FundraiserList from "./../../components/FundraiserList";
import NewFundraiser from "../../components/NewFundraiser/NewFundraiser";
import Button from "./../../components/Button";
import { FundraisingContext } from "./../../context/FundraisingContext";
import SearchBar from "./../../components/SearchBar";
import "./style.scss";

// import { useNavigate } from "react-router-dom";
// import { CSSTransitionGroup } from 'react-transition-group';

const MainPage = () => {
    // const navigate = useNavigate();

    const { connectWallet, connectedAccount } = useContext(FundraisingContext);

    const [newFundraiserPopup, setNewFundraiserPopup] = useState(false);
    const newFundraiserPopupFlag = createContext(setNewFundraiserPopup);

    const callbackFunction = (status) => {
        setNewFundraiserPopup(status);
    };

    return (
        <div className="App">
            {/* <h1
                style={{
                    color: "#e0eaf4",
                }}
            >
                Fundraising app
            </h1>
            <button onClick={connectWallet} className="buttonGradient">
                {connectedAccount ? connectedAccount : "CONNECT WALLET"}
            </button> */}

            {newFundraiserPopup ? (
                <div className="formContainer">
                    <NewFundraiser parentCallback={callbackFunction} />
                </div>
            ) : (
                <button
                    className="buttonGradient"
                    onClick={() => setNewFundraiserPopup(!newFundraiserPopup)}
                >
                    Add new fundraiser
                </button>
            )}

            {/* <Button>Lorem, ipsum.</Button>
            <SearchBar></SearchBar> */}

            <FundraiserList />
        </div>
    );
};

export default MainPage;
