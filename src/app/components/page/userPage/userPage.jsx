import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { useParams } from "react-router-dom";
import EditUser from "../editUser";

const UserPage = ({ history, userId }) => {
    const params = useParams();
    const { edit } = params;

    const [user, setUser] = useState(0);

    const handlePushBack = () => {
        history.push(`/users/${userId}/edit`);
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <h5>completed meetings: {user.completedMeetings}</h5>
                <h2>Rate: {user.rate}</h2>
                <button onClick={() => handlePushBack()}>Изменить</button>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    userId: PropTypes.string
};

export default UserPage;
