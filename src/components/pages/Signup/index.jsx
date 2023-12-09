import React, { useState } from 'react'
import Joi from "joi";
import { Button, Container, FormGroup, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../providers/Auth';
import useRegister from '../../../hooks/auth/useRegister';

const errorInitialState = {
    first_name: {
        error: false,
        message: "",
    },
    last_name: {
        error: false,
        message: "",
    },
    email: {
        error: false,
        message: "",
    },
    password: {
        error: false,
        message: "",
    },
    conf_password: {
        error: false,
        message: "",
    },
}

const SignupPage = () => {
    const register = useRegister();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: ""
    })
    const [errorState, setErrorState] = useState(errorInitialState)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required().min(5),
            conf_password: Joi.string().valid(Joi.ref("password")).required()
        })
        const validate = schema.validate(formData);
        if (validate?.error) {
            let currentErrorState = errorInitialState;
            validate.error.details.forEach((item) => {
                currentErrorState = {
                    ...currentErrorState, [item.context.label]: {
                        error: true,
                        message: item.message
                    }
                }
            })
            setErrorState(currentErrorState);
            return;
        }
        setErrorState(errorInitialState);
        const { conf_password, ...tableFormData } = formData;
        await register.registerHandler(tableFormData);
    }

    return (
        <Container maxWidth="xs" sx={{ pt: 4 }}>
            <Stack>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Typography variant='h5' sx={{ textAlign: "center", fontWeight: "semibold" }}>Create an account</Typography>
                        <FormGroup>
                            <Stack spacing={2}>
                                <TextField onChange={handleChange} type="text" name="first_name" label="First name" value={formData.first_name} error={errorState.first_name.error} helperText={errorState.first_name.message} variant="filled" size='small' />
                                <TextField onChange={handleChange} type="text" name="last_name" label="Last name" value={formData.last_name} error={errorState.last_name.error} helperText={errorState.last_name.message} variant="filled" size='small' />
                                <TextField onChange={handleChange} type="email" name="email" label="Email" value={formData.email} error={errorState.email.error} helperText={errorState.email.message} variant="filled" size='small' />
                                <TextField onChange={handleChange} type="password" name="password" label="Password" value={formData.password} error={errorState.password.error} helperText={errorState.password.message} variant="filled" size='small' />
                                <TextField onChange={handleChange} type="password" name="conf_password" label="Confirm Password" value={formData.conf_password} error={errorState.conf_password.error} helperText={errorState.conf_password.message} variant="filled" size='small' />
                                <Button type='submit' variant='contained'>register</Button>
                                <Link to="/login">
                                    <Button type='button' variant='outlined' fullWidth disabled={register.registerPayload.loading}>login</Button>
                                </Link>
                            </Stack>
                        </FormGroup>
                    </Stack>
                </form>

            </Stack>
        </Container>
    )
}

export default SignupPage;