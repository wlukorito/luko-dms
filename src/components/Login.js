import React, { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import { login } from '../actions';
import { baseURL } from './serverURL';
import Message from './utils/Message';

const Login = ({ login }) => {
    const [buttonText, setButtonText] = useState('Login');
    const [loginError, setLoginError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = e => {
        setUsername(e.target.value);
    };

    const handlePassword = e => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        setButtonText('Loging in...');
        if (username && password) {
            try {
                const response = await Axios.post(`${baseURL}/login`, { username, password });
                if (response.status === 200) {
                    console.log(response.data);
                    login(response.data); //successful signin
                }
            } catch (error) {
                console.log(error.message);
                setLoginError('Incorrect username or password');
                setButtonText('Login');
            }
        } else {
            setLoginError('You must enter username and password');
            setButtonText('Login');
        }
    };

    const RenderButton = () => {
        if (buttonText === 'Login') {
            return (
                <button className="btn btn-primary" type="submit">
                    {buttonText}
                </button>
            );
        } else {
            return (
                <button className="btn btn-primary" type="submit" disabled>
                    {buttonText}
                </button>
            );
        }
    };

    return (
        <div className="card p-5">
            <div className="card-header bg-white text-center">
                <h6 className="lead text-uppercase">CWK DMS</h6>
                <h6 className="lead">
                    <small>(Document Management System)</small>
                </h6>
            </div>
            <div className="card-body">
                {loginError ? <Message feedback={{ msg: loginError, type: 'danger' }} /> : null}
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" value={username} onChange={handleUsername} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" value={password} onChange={handlePassword} />
                    </div>
                    <RenderButton />
                </form>
            </div>
        </div>
    );
};

export default connect(
    null,
    { login }
)(Login);
