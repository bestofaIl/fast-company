import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const TestContext = React.createContext();

export const useTest = () => {
    return useContext(TestContext);
};

const TestProvider = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        console.log(history);
    }, []);
    return <TestContext.Provider>{children}</TestContext.Provider>;
};

TestProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default TestProvider;
