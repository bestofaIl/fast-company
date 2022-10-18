import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUser from "../components/page/editUser";

const Users = () => {
    const history = useHistory();
    const params = useParams();
    const { userId, edit } = params;

    if (userId && edit) {
        return <EditUser userId={userId} history={history} />;
    }
    return <>{userId ? <UserPage userId={userId} history={history} /> : <UsersListPage />}</>;
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
