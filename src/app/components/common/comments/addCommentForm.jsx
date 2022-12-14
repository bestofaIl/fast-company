import React, { useEffect, useState } from "react";
import TextArea from "../form/textArea";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
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
        setData({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextArea
                    onChange={handleChange}
                    value={data.content || ""}
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
