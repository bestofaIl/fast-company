import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUser from "../components/page/editUser";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId
                ? edit
                    ? <EditUser />
                    : <UserPage userId={userId}/>
                : <UsersListPage />}
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
