import React from "react";
import { Redirect, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import EditUserPage from "../page/editUserPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const ProtectedEdit = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const { userId } = useParams();
    if (currentUserId === userId) {
        return <EditUserPage />;
    } else {
        return <Redirect to={`/users/${currentUserId}/edit`} />;
    }
};

ProtectedEdit.propTypes = {
    component: PropTypes.func
};

export default ProtectedEdit;
