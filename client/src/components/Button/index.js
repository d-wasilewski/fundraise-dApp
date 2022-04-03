import "./style.scss";

const Button = ({ children }) => {
    return (
        <button href="#" className="btn">
            <div className="bg"></div>
            {children}
        </button>
    );
};

export default Button;
