import React from "react";
import PropTypes from "prop-types";

const SearchLine = ({ onChange, value }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

SearchLine.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchLine;
