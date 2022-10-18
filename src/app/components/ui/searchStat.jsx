import React from "react";

const SearchStat = ({ length }) => {
    const renderPhrase = (number) => {
        const combinationNounNumeral =
            (number <= 4 && number >= 2) ||
            (number.toString().slice(-1) === "2" &&
                number !== 12 &&
                number <= 4 &&
                number >= 2) ||
            (number.toString().slice(-1) === "3" &&
                number !== 13 &&
                number <= 4 &&
                number >= 2) ||
            (number.toString().slice(-1) === "4" &&
                number !== 14 &&
                number <= 4 &&
                number >= 2)
                ? `человека тусанут`
                : "человек тусанет";

        if (number === 0) {
            return (
                <>
                    <h2>
                        <span className="badge bg-danger">
                            Никто с тобой не тусанёт
                        </span>
                    </h2>
                </>
            );
        }
        return (
            <>
                <h2>
                    <span className="badge bg-primary">
                        {number} {combinationNounNumeral} с тобой
                    </span>
                </h2>
            </>
        );
    };

    return renderPhrase(length);
};

export default SearchStat;
