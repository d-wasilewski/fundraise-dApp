import "./style.scss";

const RoundIconButton = ({ children, className, iconScale }) => {
    return (
        <button className={`round-btn ${className ? className : ""}`}>
            <div
                className="icon-wrapper"
                style={{ transform: `scale(${iconScale ? iconScale : 1})` }}
            >
                <div className="icon">{children}</div>
            </div>
        </button>
    );
};

export default RoundIconButton;
