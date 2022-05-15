import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FundraisingContext } from "../../context/FundraisingContext";
import ProgressBar from "../../components/ProgressBar";
import "./style.scss";
import { ethers } from "ethers";
import { FaUserFriends } from "react-icons/fa";

const DetailsPage = () => {
    const [donatingAmount, setDonatingAmount] = useState("");
    const [contract, setContract] = useState(null);
    const { id } = useParams();
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
    const [imageUrl, setImageUrl] = useState(``);

    const handleInputChange = (e) => {
        setDonatingAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await donate(donatingAmount, contract.address);
    };

    useEffect(() => {
        const onNewDonation = async () => {
            const dataBalance = await contract.raisedAmount();
            setBalance(ethers.utils.formatEther(dataBalance));
        };

        if (contract) {
            contract.on("ContributeEvent", onNewDonation);
        }

        return () => {
            if (contract) {
                contract.off("ContributeEvent", onNewDonation);
            }
        };
    }, []);

    useEffect(async () => {
        let c = await getNewContractGivenItsAddress(id);
        const dataBalance = await c.raisedAmount();
        setBalance(ethers.utils.formatEther(dataBalance));
        const dataGoal = await c.goal();
        setGoal(ethers.utils.formatEther(dataGoal));
        const dataDeadline = await c.deadline();
        const date = new Date(parseInt(dataDeadline));
        const days = Math.floor((date - Date.now()) / (24 * 60 * 60 * 1000));
        setDeadline(days);
        const dataOwner = await c.admin();
        setOwner(ethers.utils.formatEther(dataOwner));

        const dataTitle = await c.title();
        setTitle(dataTitle);
        const dataDescription = await c.description();
        setDescription(dataDescription);
        const dataUrl = await c.urlPhoto();
        setImageUrl(dataUrl);
        setContract(c);
    }, []);

    return (
        <div className="details-wrapper">
            <div className="container">
                <div className="fundraiser-photo">
                    <img
                        src={imageUrl}
                        alt="FundraiserPhoto"
                        className="photo"
                    />
                </div>
                <div className="fundraiser-title">{title}</div>
                <div className="fundraiser-info">
                    <div className="fundraiser-description">
                        <p className="description-title">Description</p>
                        <p className="description-text">{description}</p>
                    </div>
                    <div className="fundraiser-donate">
                        <p className="first-text">
                            {balance} ETH{" "}
                            <span className="second-text">
                                out of {goal} ETH
                            </span>
                        </p>
                        <p className="first-text">
                            {deadline}{" "}
                            <span className="second-text">days left</span>
                        </p>
                        <ProgressBar
                            amount={balance}
                            goal={goal}
                            className="progressBar"
                        />

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
                                        className="buttonGradient submitButton"
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
