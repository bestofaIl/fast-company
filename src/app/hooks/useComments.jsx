import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import { commentService } from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => [...prevState, content]);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    }

    async function deleteComment(id) {
        try {
            const { content } = await commentService.deleteComment(id);
            if (content === null) {
                setComments(prevState => prevState.filter(comment => comment._id !== id));
            }
        } catch (e) {
            errorCatcher(e);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, deleteComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
