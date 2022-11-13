import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ onChange, value, name, label, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="form-label"
            >{label}</label
            >
            <textarea
                onChange={handleChange}
                className={`form-control ${getInputClasses()}`}
                id={name}
                rows="3"
                value={value}
                name={name}
            >
            </textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextArea.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextArea;
