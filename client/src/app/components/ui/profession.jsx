import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    console.log(isLoading);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loading...";
    }
};

export default Profession;

Profession.propTypes = {
    id: PropTypes.string
};
