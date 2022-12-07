import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, []);

    useEffect(async () => {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getProfession(id) {
        return professions.find(profession => profession._id === id);
    }

    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProfessionProvider;
