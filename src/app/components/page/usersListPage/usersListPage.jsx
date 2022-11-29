import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStat from "../../ui/searchStat";
import UsersTable from "../../ui/usersTable";
import SearchLine from "../../common/searchLine";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const searchRegEx = new RegExp(searchQuery, "i");

    const { users } = useUser();

    const handleDelete = (userId) => {
        // const updatedUsers = users.filter((user) => user._id !== userId);
        // setUsers(updatedUsers);
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        // setUsers(
        //     users.map((user) => {
        //         if (user._id === id) {
        //             user.bookmark = !user.bookmark;
        //         }
        //         return user;
        //     })
        // );
        console.log(id);
    };

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        setSelectedProf();
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchQuery("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const searchUsers = searchQuery ? users.filter(user => searchRegEx.test(user.name)) : users;
        const filteredUsers = selectedProf
            ? users.filter(
                user =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf))
            : searchUsers;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStat length={count}/>
                        <SearchLine onChange={handleSearchQuery} value={searchQuery} />
                        {count > 0 && (
                            <UsersTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}/>
                        )}
                        <div className="div d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return "loading...";
};

export default UsersListPage;
