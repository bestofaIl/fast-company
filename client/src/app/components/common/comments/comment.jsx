import React from "react";
import Avatar from "../avatar";
import PropTypes from "prop-types";
import displayDate from "../../../utils/displayDate";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const currentUserId = useSelector(getCurrentUserId());

    const user = useSelector(getUserById(userId));

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar width="65" height="65" src={user.image} />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}{" "}
                                        <span className="small">
                                            - {displayDate(Number(created))}
                                        </span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => {
                                                onRemove(id);
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func
};

export default Comment;
