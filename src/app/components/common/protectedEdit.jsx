import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import EditUserPage from "../page/editUserPage";

const ProtectedEdit = () => {
    const { currentUser } = useAuth();
    const { userId } = useParams();
    if (currentUser._id === userId) {
        return <EditUserPage />;
    } else {
        return <Redirect to={`/users/${currentUser._id}/edit`} />;
    }
};

ProtectedEdit.propTypes = {
    component: PropTypes.func
};

export default ProtectedEdit;
