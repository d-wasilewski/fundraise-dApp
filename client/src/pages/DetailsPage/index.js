import { useLocation, useParams } from "react-router-dom";
import { Grid, Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { FundraisingContext } from "../../context/FundraisingContext";
import ContributorsIcon from "../../icons/friends.png";
import ProgressBar from "../../components/ProgressBar";
import "./style.scss";
import { ethers } from "ethers";
import { FaUserFriends } from "react-icons/fa";

const DetailsPage = () => {
    const [donatingAmount, setDonatingAmount] = useState("");
    const { id } = useParams();
    const [contract, setContract] = useState(undefined);
    const {
        connectWallet,
        connectedAccount,
        getNewContractGivenItsAddress,
        donate,
    } = useContext(FundraisingContext);

    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [owner, setOwner] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleInputChange = (e) => {
        setDonatingAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Wplaciles " + contract.address);
        console.log("Wplaciles " + donatingAmount);
        await donate(donatingAmount, contract.address);
    };

    useEffect(async () => {
        let c = await getNewContractGivenItsAddress(id);
        const dataBalance = await c.raisedAmount();
        setBalance(ethers.utils.formatEther(dataBalance));
        const dataGoal = await c.goal();
        setGoal(ethers.utils.formatEther(dataGoal));
        const dataDeadline = await c.deadline();
        setDeadline(ethers.utils.formatEther(dataDeadline));
        const dataOwner = await c.admin();
        setOwner(ethers.utils.formatEther(dataOwner));

        const dataTitle = await c.title();
        setTitle(dataTitle);
        const dataDescription = await c.description();
        setDescription(dataDescription);

        setContract(c);
        console.log(c);
    }, []);

    return (
        <div className="details-wrapper">
            <div className="container">
                {/* <div className="fundraiser-title">
                    {fundraiser.title}
                    JESZCZE NIE MA
                </div> */}
                <div className="fundraiser-photo">
                    <img
                        src="http://placekitten.com/400/600"
                        alt="FundraiserPhoto"
                        className="photo"
                    />
                </div>
                <div className="fundraiser-info">
                    <div className="fundraiser-description">
                        <p className="description-title">Opis zrzutki</p>
                        <p className="description-text">{description}</p>
                    </div>
                    <div className="fundraiser-donate">
                        <p className="first-text">
                            {balance} ETH{" "}
                            <span className="second-text">z {goal} ETH</span>
                        </p>
                        <ProgressBar
                            amount={balance}
                            goal={goal}
                            className="progressBar"
                        />
                        <p className="first-text">
                            Liczba dni{" "}
                            <span className="second-text">do końca</span>
                        </p>
                        <p className="donators">
                            <FaUserFriends size={40} />
                            <p className="first-text">
                                ileś{" "}
                                <span className="second-text">
                                    wspierających
                                </span>
                            </p>
                        </p>
                        {connectedAccount ? (
                            <>
                                <form onSubmit={handleSubmit} className="form">
                                    <input
                                        className="amountInput"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="amount"
                                        required
                                    />
                                    <input
                                        className="submitButton"
                                        type="submit"
                                        value="Submit"
                                    />
                                </form>
                            </>
                        ) : (
                            <button onClick={connectWallet}>
                                Connect to wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
