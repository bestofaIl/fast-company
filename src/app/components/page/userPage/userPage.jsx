import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import Avatar from "../../common/avatar";
import CommentsList from "../../common/commentsList";
import NewCommentForm from "../../common/newCommentForm";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState(0);

    const handlePushBack = () => {
        history.push(`/users/${userId}/edit`);
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const src = `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}.svg`;

    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={handlePushBack}>
                                        <i className="bi bi-gear"></i>
                                    </button>
                                    <div
                                        className="d-flex flex-column align-items-center text-center position-relative">
                                        <Avatar src={src} width="250" height="150"/>
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">{user.profession.name}</p>
                                            <div className="text-muted">
                                                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                                <i className="bi bi-caret-up text-secondary" role="button"></i>
                                                <span className="ms-2">{user.rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <Qualities qualities={user.qualities} />
                                    </p>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">{user.completedMeetings}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <Comments userId={userId} />
                        </div>
                    </div>
                </div>
                {/* <h1>{user.name}</h1> */}
                {/* <h2>Профессия: {user.profession.name}</h2> */}
                {/* <Qualities qualities={user.qualities} /> */}
                {/* <h5>completed meetings: {user.completedMeetings}</h5> */}
                {/* <h2>Rate: {user.rate}</h2> */}
                {/* <button onClick={() => handlePushBack()}>Изменить</button> */}
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
