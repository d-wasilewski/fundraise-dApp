import "./style.scss";
import ProgressBar from "../ProgressBar";
import Button from "../Button";
import RoundIconButton from "../RoundIconButton";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

const FundraiserListElement = ({ data }) => {
    return (
        <div className="card">
            <div className="item-wrapper">
                <div className="countdown">
                    <Countdown
                        date={new Date(data.end)}
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
                <img src={data.image} alt="Fundraise background image" />
                <Link
                    to={`/details/${data.index}`}
                    state={{ fundraiser: data }}
                    className="link"
                >
                    <RoundIconButton className="show-more-btn">
                        <FaArrowRight />
                    </RoundIconButton>
                </Link>

                <div className="item">
                    <h1>{data.title}</h1>
                    <p>{`${data.description.substring(0, 120)}${
                        data.description.length < 120 ? "" : "..."
                    }`}</p>
                    <ProgressBar amount={data.amount} goal={data.goal} />
                </div>
            </div>
        </div>
    );
};

export default FundraiserListElement;
