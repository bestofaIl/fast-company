import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import PropTypes from "prop-types";
import api from "../../api";

const Comment = ({ data, onDelete }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(data.userId)
            .then((data) => {
                setUser(data);
            });
    }, []);
    const src = `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}.svg`;

    function displayDate(ms) {
        const diffMs = Date.now() - ms;
        if (diffMs <= 60000) {
            return "1 минуту назад";
        } else {
            if (diffMs > 60000 && diffMs <= 300000) {
                return "5 минуту назад";
            } else {
                if (diffMs > 300000 && diffMs <= 600000) {
                    return "10 минуту назад";
                } else {
                    if (diffMs > 600000 && diffMs <= 1800000) {
                        return "30 минуту назад";
                    } else {
                        if (diffMs > 1800000 && diffMs <= 86_400_000) {
                            return `${new Date(ms).getHours()}.${new Date(ms).getMinutes()}`;
                        } else {
                            if (diffMs > 86_400_00 && diffMs <= 31_536_000_000) {
                                return `${new Date(ms).getDate()}.${new Date(ms).getMonth() + 1}`;
                            } else {
                                return `${new Date(ms).getDate()}.${new Date(ms).getMonth() + 1}.${new Date(ms).getFullYear()}`;
                            }
                        }
                    }
                }
            }
        }
    }

    if (user) {
        return (
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <Avatar width="65" height="65" src={src}/>
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            {" - "}
                                            <span className="small">
                                                {displayDate(Number(data.created_at))}
                                        </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => {
                                                onDelete(data._id);
                                            }}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{data.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Comment.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func
};

export default Comment;
