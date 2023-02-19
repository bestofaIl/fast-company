import React, { useEffect } from "react";
import { AddCommentForm } from "../common/comments";
import CommentsList from "../common/comments/commentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    addComment,
    deleteComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";
import { nanoid } from "nanoid";
import displayDate from "../../utils/displayDate";

function sortByDate(arr) {
    if (!arr) return 0;
    const copyOfArr = [...arr];
    for (let i = 0; i < copyOfArr.length; i++) {
        for (let k = 0; k < copyOfArr.length - i - 1; k++) {
            if (
                Number(copyOfArr[k].created_at) <
                Number(copyOfArr[k + 1].created_at)
            ) {
                const temp = copyOfArr[k];
                copyOfArr[k] = copyOfArr[k + 1];
                copyOfArr[k + 1] = temp;
            }
        }
    }
    return copyOfArr;
}

const Comments = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());

    const handleRemoveComment = (id) => {
        dispatch(deleteComment(id));
    };

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now()
        };
        dispatch(addComment(comment));
    };

    const sortedComments = sortByDate(comments);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr/>
                        {!isLoading ? (
                            <CommentsList
                                onRemove={handleRemoveComment}
                                comments={sortedComments}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
