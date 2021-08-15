import { Form, Input, Button } from 'antd';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { registerUser } from '../_actions/user_actions';

const Wrapper = styled.div`
    width: 20rem;
    margin: 0 auto;

`
const InputForm = styled.div`
    margin-bottom: 1rem;
`

const RegisterPage = (props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const { name, lastName, email, password, passwordConfirm } = form

    const handleChange = e => {
        const nextForm = {
            ...form,
            [e.target.id]: e.target.value
        }
        setForm(nextForm);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            name,
            lastName,
            email,
            password,
            passwordConfirm

        }
        dispatch(registerUser(data))
            .then(response => {
                if (response.payload.success) {
                    console.log(response)
                    props.history.push('/login')
                } else {
                    alert(response.payload.err.errmsg)
                }
            })
    }

    console.log(form)
    return (
        <Wrapper >
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <InputForm>
                    <span>name</span>
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        value={name}
                    />
                </InputForm>
                <InputForm>
                    <span>Last Name</span>
                    <Input
                        id="lastName"
                        placeholder="Enter your Last Name"
                        onChange={handleChange}
                        value={lastName}
                    />
                </InputForm>
                <InputForm>
                    <span>Email</span>
                    <Input
                        id="email"
                        placeholder="Enter your Email"
                        onChange={handleChange}
                        value={email}
                    />
                </InputForm>
                <InputForm>
                    <span>Password</span>
                    <Input
                        id="password"
                        placeholder="Enter your Password"
                        onChange={handleChange}
                        value={password}
                    />
                </InputForm>
                <InputForm>
                    <span>Confirm Password</span>
                    <Input
                        id="passwordConfirm"
                        placeholder="Enter your confirm Password"
                        onChange={handleChange}
                        value={passwordConfirm}
                    />
                </InputForm>
                <button>회원가입</button>
            </form>
        </Wrapper>
    )
}

export default RegisterPage
