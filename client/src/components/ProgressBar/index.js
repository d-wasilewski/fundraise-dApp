import "./style.scss";
import { useState } from "react";
import { SiEthereum } from "react-icons/si";

const ProgressBar = ({ amount, goal, className }) => {
    const [width, setWidth] = useState(0);

    return (
        <div
            className={`progress-wrapper  ${className ? className : ""}`}
            style={{ borderRadius: "30000px" }}
            ref={(el) => {
                if (!el) return;

                // console.log(el.getBoundingClientRect().width);
                setTimeout(() => {
                    // usually prints a value that is larger than the first console.log
                    setWidth(el.getBoundingClientRect().width);

                    // console.log("later", width);
                }, 500);
            }}
        >
            <div
                className="progress"
                style={{ left: `${width * (amount / goal)}px` }}
            ></div>
            <div className="label">
                <span className="amount">{`${amount}/${goal}`}</span>
                <SiEthereum className="icon" />
            </div>
        </div>
    );
};

export default ProgressBar;
