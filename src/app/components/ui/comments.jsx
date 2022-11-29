import React, { useEffect, useState } from "react";
import { AddCommentForm } from "../common/comments";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";
import { useParams } from "react-router-dom";

function sortByDate(arr) {
    if (!arr) return 0;
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

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => {
                setComments(data);
            });
    }, []);

    const handleRemoveComment = (id) => {
        api.comments.remove(id)
            .then((id) => {
                setComments(comments.filter(comment => comment._id !== id));
            });
    };

    const handleSubmit = (data) => {
        api.comments.add({
            ...data,
            pageId: userId
        })
            .then((data) => {
                setComments([...comments, data]);
            });
    };

    const sortedComments = sortByDate(comments);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />

                        <CommentsList
                            onRemove={handleRemoveComment}
                            comments={sortedComments}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
