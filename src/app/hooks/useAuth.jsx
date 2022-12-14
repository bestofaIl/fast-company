import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
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
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                    case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позже!"
                        );
                    default:
                        throw new Error(
                            "Логин или пароль введены некорректно!"
                        );
                }
            }
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.replace("/");
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
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
            const { content } = await userService.create(data);
            console.log(content);
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

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(async () => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    async function updateUserData(id, payload) {
        try {
            const { content } = await userService.update(id, payload);
            setCurrentUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, currentUser, logOut, updateUserData }}
        >
            {!isLoading ? children : "Loading"}
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
