import { useContext, useState } from "react";
import FundraiserList from "./../../components/FundraiserList";
import NewFundraiser from "./../../components/NewFundraiser";
import Button from "./../../components/Button";
import { FundraisingContext } from "./../../context/FundraisingContext";
import SearchBar from "./../../components/SearchBar";

// import { useNavigate } from "react-router-dom";
// import { CSSTransitionGroup } from 'react-transition-group';

const MainPage = () => {
    // const navigate = useNavigate();

    const { connectWallet, connectedAccount } = useContext(FundraisingContext);

    const [newFoundraiserPopup, setnewFoundraiserPopup] = useState(false);

    const callbackFunction = (status) => {
        setnewFoundraiserPopup(status);
    };

    return (
        <div className="App">
            <h1
                style={{
                    color: "#e0eaf4",
                }}
            >
                Fundraising app
            </h1>
            <button onClick={connectWallet} className="buttonGradient">
                {connectedAccount ? connectedAccount : "CONNECT WALLET"}
            </button>

            {newFoundraiserPopup ? (
                // <ReactCSSTransitionGroup
                //   transitionName="example"
                //   transitionEnterTimeout={500}
                //   transitionLeaveTimeout={300}
                // >
                //
                // </ReactCSSTransitionGroup>
                <NewFundraiser parentCallback={callbackFunction} />
            ) : (
                <button
                    className="buttonGradient"
                    onClick={() => setnewFoundraiserPopup(!newFoundraiserPopup)}
                >
                    Add new fundraiser
                </button>
            )}

            <Button>Lorem, ipsum.</Button>
            <SearchBar></SearchBar>

            <FundraiserList />
        </div>
    );
};

export default MainPage;
