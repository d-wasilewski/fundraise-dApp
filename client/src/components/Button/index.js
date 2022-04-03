import "./style.scss";

const Button = ({ children, className, onClick }) => {
    return (
        <button
            className={`btn ${className ? className : ""}`}
            onClick={onClick}
        >
            <div className="bg"></div>
            {children}
        </button>
    );
};

export default Button;
