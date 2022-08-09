import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, rest }) => {
    return (
        <>
            <td>{user.name}</td>
            <td>
                {" "}
                <Qualitie qualities={user.qualities} />{" "}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{`${user.rate} /5`}</td>
            <td>
                <button onClick={() => rest.onToggleBookMark(user._id)}>
                    <Bookmark status={user.bookmark} />
                </button>
            </td>

            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        rest.onDelete(user._id);
                    }}
                >
                    delete
                </button>
            </td>
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired
};

export default User;
