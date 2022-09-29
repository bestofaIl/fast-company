import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputClassAddition = error ? "is-invalid" : "is-valid";

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className= {`form-control ${inputClassAddition}`}
                />
                {type === "password" && (
                    <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
                        <i className={(showPassword ? "bi bi-eye" : "bi bi-eye-slash")}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
