import React from "react";

const Qualitie = ({qualities}) => {
    return (
        qualities.map(quality => {
            return <span key={quality._id}
                         className={`badge bg-${quality.color} me-2`}>
                {quality.name}
            </span>
        })
    )


}

export default Qualitie;