import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import api from "../../../api";
import TextArea from "../form/textArea";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        userId: "",
        content: ""
    });

    useEffect(() => {
        api.users.fetchAll().then((data) => {
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
        userId: {
            isRequired: {
                message: "Choose user"
            }
        },
        content: {
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
            userId: "",
            content: ""
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <SelectField
                    label="hello"
                    defaultOption="Выберите пользователя"
                    value={data.userId}
                    onChange={handleChange}
                    name="userId"
                    options={users}
                    error={errors.userId}
                />
                <TextArea
                    onChange={handleChange}
                    value={data.content}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
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
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
