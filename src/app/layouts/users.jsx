import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {userId
                    ? edit
                        ? <EditUserPage />
                        : <UserPage userId={userId}/>
                    : <UsersListPage />}
            </UserProvider>
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
