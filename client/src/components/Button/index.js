import "./style.scss";

const Button = ({ children, className, onClick, style }) => {
    return (
        <button
            style={style}
            className={`btn ${className ? className : ""}`}
            onClick={onClick}
        >
            <div className="bg"></div>
            {children}
        </button>
    );
};

export default Button;
