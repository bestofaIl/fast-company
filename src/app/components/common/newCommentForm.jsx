import React, { useEffect, useState } from "react";
import SelectField from "./form/selectField";
import api from "../../api";
import TextArea from "./form/textArea";
import { validator } from "../../utils/validator";
import PropTypes from "prop-types";

const NewCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        user: "",
        description: ""
    });

    useEffect(() => {
        api.users.fetchAll()
            .then((data) => {
                const usersList = data.map((user) => {
                    return {
                        value: user._id,
                        label: user.name
                    };
                });
                setUsers(usersList);
            });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        user: {
            isRequired: {
                message: "Choose user"
            }
        },
        description: {
            isRequired: {
                message: "Description is required to fill"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
        setData({
            user: "",
            description: ""
        });
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <SelectField
                            label="hello"
                            defaultOption="Выберите пользователя"
                            value={data.user}
                            onChange={handleChange}
                            name="user"
                            options={users}
                            error={errors.user}
                        />
                        <TextArea
                            onChange={handleChange}
                            value={data.description}
                            name="description"
                            label="Сообщение"
                            error={errors.description}
                        />
                    </div>
                    <button
                        className="btn btn-primary float-end"
                        type="submit"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </form>
            </div>
        </div>
    );
};

NewCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default NewCommentForm;
