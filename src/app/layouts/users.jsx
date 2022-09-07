import React from "react";
import PropTypes from "prop-types";
import UsersList from "../components/usersList";
import UserPage from "../components/userPage";

const Users = ({ match, history }) => {
    const userId = match.params.userId;
    return <>{userId ? <UserPage userId={userId} history={history} /> : <UsersList />}</>;
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
