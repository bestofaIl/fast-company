import React, { useState } from "react";
import api from "../api/index";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ history, userId }) => {
    const [user, setUser] = useState(0);

    const handlePushBack = () => {
        history.push("/users");
    };
    api.users.getById(userId).then(data => {
        setUser(data);
    });
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h5>completed meetings: {user.completedMeetings}</h5>
                <h2>Rate: {user.rate}</h2>
                <button onClick={() => handlePushBack()}>Все пользователи</button>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default UserPage;
