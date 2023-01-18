import { createAction, createSlice } from "@reduxjs/toolkit";
import { commentService } from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreateSucceed: (state, action) => {
            state.entities.push(action.payload);
        },
        commentDeleteSucceed: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreateSucceed,
    commentDeleteSucceed
} = commentsSlice.actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const commentDeleteFailed = createAction("comments/commentDeleteFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
    }
};

export const addComment = (comment) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreateSucceed(content));
    } catch (e) {
        dispatch(commentCreateFailed());
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(commentDeleteRequested());
    try {
        const { content } = await commentService.deleteComment(commentId);
        if (content === null) {
            dispatch(commentDeleteSucceed(commentId));
        }
    } catch (e) {
        dispatch(commentDeleteFailed(e.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
