import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const professionsList = professions.map((prof) => ({
        value: prof._id,
        label: prof.name
    }));
    const qualitiesList = qualities.map((quality) => ({
        value: quality._id,
        label: quality.name
    }));
    const [errors, setErrors] = useState({});

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

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required to fill"
            },
            isEmail: {
                message: "Check your email"
            }
        },
        password: {
            isRequired: {
                message: "Password is required to fill"
            },
            isCapitalSymbol: {
                message: "Password must contain at least one capital letter"
            },
            isContainDigit: {
                message: "Password must contain at least one digit"
            },
            min: {
                message: "Password must contain at least 8 symbols",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Profession is required to fill"
            }
        },
        licence: {
            isRequired: {
                message: "Need to accept licence"
            }
        },
        name: {
            isRequired: {
                message: "Name is required to fill"
            },
            min: {
                message: "Password must contain at least 3 symbols",
                value: 3
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (e) {
            setErrors(e);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professionsList}
                defaultOption="Choose..."
                name="profession"
                error={errors.profession}
                value={data.profession}
                label="Choose your job"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name="sex"
                value={data.sex}
                onChange={handleChange}
                label="Choose your sex"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Choose your qualities"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить
                <a> лицензионное соглашение</a>
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
