import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onDelete }) => {
    if (comments) {
        return (
            <>
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr/>
                        {comments.map(comment => <Comment key={comment._id} data={ comment } onDelete={() => onDelete(comment._id)}/>)}
                    </div>
                </div>
            </>
        );
    }
    return null;
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
