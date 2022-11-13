import React, { useEffect, useState } from "react";
import NewCommentForm from "../common/newCommentForm";
import CommentsList from "../common/commentsList";
import api from "../../api";
import PropTypes from "prop-types";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState();

    const handleDelete = (id) => {
        api.comments.remove(id)
            .then((id) => {
                const newComments = comments.filter(comment => comment._id !== id);
                setComments(newComments);
            });
    };

    function sortByDate(arr) {
        if (!arr) return null;
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length - i - 1; k++) {
                if (Number(arr[k].created_at) < Number(arr[k + 1].created_at)) {
                    const temp = arr[k];
                    arr[k] = arr[k + 1];
                    arr[k + 1] = temp;
                }
            }
        }
        return arr;
    }

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId)
            .then((data) => {
                setComments(data);
            });
    }, []);

    const handleSubmit = (data) => {
        api.comments.add({
            pageId: userId,
            userId: data.user,
            content: data.description
        })
            .then((data) => {
                setComments((prevState) => {
                    return [
                        ...prevState,
                        data
                    ];
                });
            });
    };

    const sortedComments = sortByDate(comments);
    return (
        <>
            <NewCommentForm onSubmit={handleSubmit}/>
            <CommentsList onDelete={handleDelete} comments={sortedComments}/>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
