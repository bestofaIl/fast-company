import React, {useState} from "react";
import API from "./api";
import SearchStat from "./components/searchStat";
import api from "./api";
import Users from "./components/users";

const App = () => {

    let [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
    }
    const handleToggleBookMark = (id) => {
        setUsers(users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        }));
    }

    return (
        <>
            <SearchStat length={users.length} />
            {users.length > 0 &&
            <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark}/>}
        </>
    )
}

export default App;