import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        try {
            const { content } = await qualityService.fetchAll();
            setQualities(content);
            setIsLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }, []);

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

    function getQuality(id) {
        return qualities.find(quality => quality._id === id);
    }
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            { children }
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default QualityProvider;
