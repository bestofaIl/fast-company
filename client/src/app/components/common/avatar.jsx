import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ src, width, height }) => {
    return (
        <img
            src={src}
            className="rounded-circle shadow-1-strong me-3"
            width={width}
            height={height}
            alt="avatar"
        />
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

export default Avatar;
