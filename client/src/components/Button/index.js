import "./style.scss";

const Button = ({ children, className }) => {
    return (
        <button href="#" className={`btn ${className ? className : ""}`}>
            <div className="bg"></div>
            {children}
        </button>
    );
};

export default Button;
