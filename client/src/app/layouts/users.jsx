import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import ProtectedEdit from "../components/common/protectedEdit";
import UsersLoader from "../components/ui/hoc/users.loader";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        <ProtectedEdit />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
