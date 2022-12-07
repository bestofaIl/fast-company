import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState();

    async function signIn({ email, password }) {
        try {
            console.log(email, password);
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            setTokens(data);
            console.log(data);
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                    case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
                        throw new Error("Слишком много попыток входа. Попробуйте позже!");
                    default:
                        throw new Error("Логин или пароль введены некорректно!");
                }
            }
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            console.log(code, message);
            if (code === 400) {
                const errorObject = { email: "Email занят!" };
                if (message === "EMAIL_EXISTS") {
                    throw errorObject;
                }
            }
            // throw new Error
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setCurrentUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
