import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    const qualitiesList = qualities.map(qualityId => getQuality(qualityId));
    if (!isLoading) {
        return <>
            {qualitiesList.map(quality => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>;
    }
    return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
