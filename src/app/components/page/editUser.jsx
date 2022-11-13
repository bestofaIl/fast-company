import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import api from "../../api";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    const formatQualities = (qualities) => {
        return Object.keys(qualities).map((qualityName) => ({
            label: qualities[qualityName].name,
            value: qualities[qualityName]._id,
            color: qualities[qualityName].color
        }));
    };

    const formatProfession = (profession) => {
        return {
            label: profession.name,
            value: profession._id
        };
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return {
                    _id: prof.value,
                    name: prof.label
                };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem.value === quality.value) {
                    qualitiesArray.push({
                        _id: quality.value,
                        name: quality.label,
                        color: quality.color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });

        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((qualityName) => ({
                label: data[qualityName].name,
                value: data[qualityName]._id,
                color: data[qualityName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        user &&
            setData({
                name: user.name,
                email: user.email,
                profession: formatProfession(user.profession).value,
                sex: user.sex,
                qualities: formatQualities(user.qualities)
            });
    }, [user]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmitChange = () => {
        const preparedData = {
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        };
        api.users.update(userId, preparedData);
        history.replace(`/users/${userId}`);
    };

    const handleBack = () => {
        history.push(`/users/${userId}`);
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={handleBack}>Назад</button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {professions ? (
                        <>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                error="without"
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                error="without"
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                name="profession"
                                value={data.profession}
                                options={professions}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                defaultValue={data.qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button onClick={handleSubmitChange} className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

EditUser.propTypes = {
    history: PropTypes.object,
    userId: PropTypes.string
};

export default EditUser;
