import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (!isLoading) {
        const qualitiesList = useSelector(getQualitiesByIds(qualities));
        return (
            <>
                {qualitiesList.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    }
    return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
