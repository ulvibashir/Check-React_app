import React, { useState } from 'react';
import { getUsersFetch, createUserFetch } from '../API';

export const AuthPage = ({ history: { push } }) => {
    const [authType, setAuthType] = useState('login')
    const [fields, setFields] = useState({
        fullName: '',
        username: '',
        password: ''
    })
    const [errorTxt, setErrorTxt] = useState('')
    const [loader, setLoader] = useState(false);
    const fieldsChangeHandler = (name, e) => {
        setErrorTxt('')
        const { value } = e.target
        setFields(v => ({
            ...v,
            [name]: value
        }))
    }

    const clearFields = () => {
        setFields(v => ({
            ...v,
            fullName: '',
            username: '',
            password: ''
        }))
    }
    const onSubmitHandler = async () => {

        const loginValidation =
            fields.username.trim() !== '' &&
            fields.password.trim() !== '';

        const registerValidation =
            fields.username.trim() !== '' &&
            fields.password.trim() !== '' &&
            fields.fullName.trim() !== '';

        if (authType === 'login' && !loginValidation) setErrorTxt("Please fill all fields")
        if (authType === 'register' && !registerValidation) setErrorTxt("Please fill all fields")

        if (authType === 'login' && loginValidation) {
            try {
                setLoader(true);
                const response = await getUsersFetch();
                setLoader(false);

                for (let key in response) {
                    if (fields.username === response[key].username &&
                        fields.password === response[key].password) {
                        clearFields();
                        push(`/search/${key}`)
                        return;
                    }
                }
                setErrorTxt('Wrong username or password')

            } catch (e) {
                console.log('AuthPage, login', e);
            }

        } else if (authType === 'register' && registerValidation) {
            try {
                setLoader(true);
                await createUserFetch({
                    name: fields.fullName,
                    username: fields.username,
                    password: fields.password
                })
                setLoader(false);
                clearFields();
                setAuthType('login')
            } catch (e) {
                console.log('AuthPage register', e);
            }
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-header">
                <button
                    onClick={() => { setAuthType('login') }}
                    className={authType === 'login' ? 'h-btn h-active' : 'h-btn'}>Login</button>
                <button
                    onClick={() => { setAuthType('register') }}
                    className={authType === 'register' ? 'h-btn h-active' : 'h-btn'}>Register</button>
            </div>
            <div className="auth-from">
                {authType === 'register' &&
                    <input
                        value={fields.fullName}
                        onChange={(e) => { fieldsChangeHandler('fullName', e) }}
                        className="txt-input"
                        type="text"
                        placeholder="Full name" />}
                <input
                    value={fields.username}
                    onChange={(e) => { fieldsChangeHandler('username', e) }}
                    className="txt-input"
                    type="text"
                    placeholder="Username" />
                <input
                    value={fields.password}
                    onChange={(e) => { fieldsChangeHandler('password', e) }}
                    className="txt-input"
                    type="password"
                    placeholder="Password" />
                <div className="loader-btn-container">

                    {
                        !loader ?
                            <button
                                className="submit-btn"
                                onClick={onSubmitHandler}>
                                {authType === 'login' ? 'Login' : 'Submit'}</button>
                            :
                            <div className="lds-dual-ring" />
                    }

                </div>

            </div>
            <p className="err-txt">{errorTxt}</p>
        </div>
    )
}