import React from "react";

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

export default Avatar;
