import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [caret, setCaret] = useState();
    const caretUp = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        className="bi bi-caret-up-fill" viewBox="0 0 16 16">
        <path
            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
    </svg>;
    const caretDown = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        className="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>;

    const handleSort = (item) => {
        setCaret();
        if (selectedSort.iter === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    useEffect(() => {
        if (selectedSort.order === "asc") {
            setCaret(caretUp);
        } else {
            console.log("down");
            setCaret(caretDown);
        }
    }, [selectedSort]);
    return (<thead>
        <tr>
            {Object.keys(columns).map(column => (
                <th
                    key={column}
                    onClick={
                        columns[column].path
                            ? () => handleSort(columns[column].path)
                            : undefined}
                    {...{ role: columns[column].path && "button" }}
                    scope="col"
                >
                    {columns[column].name}
                    {columns[column].path === selectedSort.iter && caret}
                </th>
            ))}
            {/* <th onClick={() => handleSort("name")} scope="col">Имя</th> */}
            {/* <th scope="col">Качества</th> */}
            {/* <th onClick={() => handleSort("profession.name")} scope="col">Профессия</th> */}
            {/* <th onClick={() => handleSort("completedMeetings")} scope="col">Встретился, раз</th> */}
            {/* <th onClick={() => handleSort("rate")} scope="col">Оценка</th> */}
            {/* <th onClick={() => handleSort("bookmark")} scope="col">Избранное</th> */}
            {/* <th scope="col"></th> */}
        </tr>
    </thead>
    );
};

export default TableHeader;

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
