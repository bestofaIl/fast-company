import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";
import ProtectedEdit from "../components/common/protectedEdit";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {userId
                    ? edit
                        ? <ProtectedEdit />
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
