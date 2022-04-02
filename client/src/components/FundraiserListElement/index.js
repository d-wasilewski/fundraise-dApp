import "./style.scss";
import ProgressBar from "../ProgressBar";

const FundraiserListElement = ({ title, description, amount, goal, image }) => {
    return (
        <div className="itemWrapper">
            <img src={image} alt="Fundraise background image" />
            <div className="item">
                <h1>{title}</h1>
                <p>{`${description.substring(0, 120)}${
                    description.length < 120 ? "" : "..."
                }`}</p>
                <ProgressBar
                    amount={amount}
                    goal={goal}
                    className="progressBar"
                />
            </div>
        </div>
    );
};

export default FundraiserListElement;
