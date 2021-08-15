import { Form, Input, Button } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { loginUser } from '../_actions/user_actions';

const Wrapper = styled.div`
    width: 20rem;
    margin: 0 auto;

`
const InputForm = styled.div`
    margin-bottom: 1rem;
`

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const { email, password, passwordConfirm } = form

    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

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
            email,
            password
        }
        dispatch(loginUser(data))
            .then(response => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    if (rememberMe === true) {
                        window.localStorage.setItem('rememberMe', response.payload.userId);
                    } else {
                        localStorage.removeItem('rememberMe');
                    }
                    props.history.push("/");
                } else {
                    alert('Check out your Account or Password again')
                }
            })
    }

    console.log(form)
    return (
        <Wrapper >
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
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
                <button>로그인</button>
            </form>
        </Wrapper>
    )
}

export default LoginPage
