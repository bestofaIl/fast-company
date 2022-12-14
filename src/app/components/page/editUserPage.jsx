import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../common/backButton";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";

const EditUserPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const { currentUser, updateUserData } = useAuth();

    const {
        professions,
        getProfession,
        isLoading: professionsLoading
    } = useProfessions();
    const formattedProfessions = professions.map((profession) => {
        return {
            label: profession.name,
            value: profession._id
        };
    });
    const {
        qualities,
        getQuality,
        isLoading: qualitiesLoading
    } = useQualities();
    const formattedQualities = qualities.map((quality) => {
        return {
            label: quality.name,
            value: quality._id
        };
    });

    const [data, setData] = useState();

    const getQualitiesByIds = (qualityIdArray) => {
        return qualityIdArray.map((id) => {
            const quality = getQuality(id);
            return {
                label: quality.name,
                value: quality._id
            };
        });
    };

    const formatProfession = (professionId) => {
        const profession = getProfession(professionId);
        return {
            label: profession.name,
            value: profession._id
        };
    };

    const getQualities = (qualities) => {
        return qualities.map((quality) => quality.value);
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                profession: formatProfession(currentUser.profession).value,
                qualities: getQualitiesByIds(currentUser.qualities)
            });
        }
    }, [qualitiesLoading, professionsLoading, currentUser]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmitChange = async (e) => {
        e.preventDefault();
        const preparedData = {
            ...data,
            qualities: getQualities(data.qualities)
        };
        await updateUserData(userId, preparedData);
        history.replace(`/users/${userId}`);
    };

    return (
        <div className="container mt-5">
            <BackButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                // error="without"
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                // error="without"
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                value={data.profession}
                                options={formattedProfessions}
                                onChange={handleChange}
                                error={errors.profession}
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
                                options={formattedQualities}
                                defaultValue={data.qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                onClick={handleSubmitChange}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    history: PropTypes.object,
    userId: PropTypes.string
};

export default EditUserPage;
