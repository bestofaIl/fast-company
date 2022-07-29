import React, {useState} from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => userId !== user._id));
    }

    const renderPhrase = (number) => {
        let combinationNounNumeral = ((number <=4 && number >= 2)
            || (number.toString().slice(-1) === '2' && number !== 12 && (number <=4 && number >= 2))
            || (number.toString().slice(-1) === '3' && number !== 13 && (number <=4 && number >= 2))
            || (number.toString().slice(-1) === '4' && number !== 14 && (number <=4 && number >= 2)))
            ? `человека тусанут` : 'человек тусанет';

        if (number === 0) {
            return (
                <>
                    <h2>
                        <span className='badge bg-danger'>Никто с тобой не тусанёт</span>
                    </h2>
                </>
            )
        }
        return (
            <>
                <h2>
                    <span className='badge bg-primary'>{number} {combinationNounNumeral} с тобой</span>
                </h2>
            </>
        )
    }


    if (users.length === 0) {
        return renderPhrase(users.length);
    }

    return (
        <>
            {renderPhrase(users.length)}
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody className='table-group-divider'>
                {users.map(user => {
                    return (<tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.qualities.map(quality => {
                            return <span key={quality._id} className={`badge bg-${quality.color} me-2`}>{quality.name}</span>;
                        })}</td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{`${user.rate} /5`}</td>
                        <td><button className='btn btn-danger' onClick={() => {handleDelete(user._id)}}>delete</button></td>
                    </tr>)
                })}
                </tbody>
            </table>

        </>
    )
}

export default Users;