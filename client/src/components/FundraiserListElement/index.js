import "./style.scss";
import ProgressBar from "../ProgressBar";
import Button from "../Button";

const FundraiserListElement = ({ title, description, amount, goal, image }) => {
    return (
        <div className="card">
            <div className="item-wrapper">
                {/* <div className="img-wrapper"> */}
                <img src={image} alt="Fundraise background image" />
                {/* </div> */}
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
                    {/* <Button>support</Button> */}
                </div>
            </div>
        </div>
    );
};

export default FundraiserListElement;
