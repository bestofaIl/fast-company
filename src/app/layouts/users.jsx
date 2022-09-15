import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UsersList from "../components/usersList";
import UserPage from "../components/userPage";

const Users = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} history={history} /> : <UsersList />}</>;
};

Users.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Users;
