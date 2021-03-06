import "./style.scss";
import ProgressBar from "../ProgressBar";
import Button from "../Button";
import RoundIconButton from "../RoundIconButton";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const FundraiserListElement = ({ data }) => {
    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(``);

    useEffect(async () => {
        const dataBalance = await data.raisedAmount();
        setBalance(ethers.utils.formatEther(dataBalance));
        const dataGoal = await data.goal();
        setGoal(ethers.utils.formatEther(dataGoal));
        const dataDeadline = await data.deadline();
        setDeadline(dataDeadline.toString());
        const dataTitle = await data.title();
        setTitle(dataTitle);
        const dataDescription = await data.description();
        setDescription(dataDescription);
        const dataUrl = await data.urlPhoto();
        setImageUrl(dataUrl);
        const dataApp = await data.approved();
    }, []);

    return (
        <div className="card">
            <div className="item-wrapper">
                <div className="countdown">
                    <Countdown
                        date={new Date(parseInt(deadline))}
                        renderer={({
                            days,
                            hours,
                            minutes,
                            seconds,
                            completed,
                        }) => {
                            if (completed) {
                                return <span>Fundraise ended</span>;
                            } else {
                                return (
                                    <span
                                        className={
                                            days ? "" : "the-end-is-near"
                                        }
                                    >
                                        {days ? days + " days " : ""}
                                        {hours
                                            ? hours < 10
                                                ? "0" + hours
                                                : hours
                                            : "00"}
                                        :
                                        {minutes
                                            ? minutes < 10
                                                ? "0" + minutes
                                                : minutes
                                            : "00"}
                                        :
                                        {seconds
                                            ? seconds < 10
                                                ? "0" + seconds
                                                : seconds
                                            : "00"}
                                    </span>
                                );
                            }
                        }}
                    />
                </div>
                <img src={imageUrl} alt="Fundraise background image" />
                <Link
                    to={`/details/${data.address}`}
                    state={{ fundraiser: data }}
                    className="link"
                >
                    <RoundIconButton className="show-more-btn">
                        <FaArrowRight />
                    </RoundIconButton>
                </Link>

                <div className="item">
                    <h1>{title}</h1>
                    <p>{`${description.substring(0, 120)}${
                        description.length < 120 ? "" : "..."
                    }`}</p>
                    <ProgressBar amount={balance} goal={goal} />
                </div>
            </div>
        </div>
    );
};

export default FundraiserListElement;
