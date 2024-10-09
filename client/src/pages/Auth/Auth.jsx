import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { logIn, signUp } from '../../actions/AuthActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpass: '',
    };

    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState(initialState);
    const [confirmPass, setConfirmPass] = useState(true);

    const loading = useSelector((state) => state.authReducer.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Reset Form
    const resetForm = () => {
        setData(initialState);
        setConfirmPass(true);
    };

    // Handle input change
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (data.password === data.confirmpass) {
                dispatch(signUp(data, navigate));
            } else {
                setConfirmPass(false);
            }
        } else {
            dispatch(logIn(data, navigate));
        }
    };

    return (
        <div className="Auth">
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="ZKC Logo" />
                <div className="Webname">
                    <h1>Socio</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {/* Right Form Side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? 'Register' : 'Login'}</h3>

                    {isSignUp && (
                        <div className="nameInput">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="infoInput"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="passwordInput">
                        <input
                            type="password"
                            placeholder="Password"
                            className="infoInput"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="infoInput"
                                name="confirmpass"
                                value={data.confirmpass}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>

                    {!confirmPass && (
                        <span className="errorMessage">
                            *Confirm password does not match
                        </span>
                    )}

                    <div className="formFooter">
                        <span
                            className="toggleFormLink"
                            onClick={() => {
                                resetForm();
                                setIsSignUp((prev) => !prev);
                            }}
                        >
                            {isSignUp
                                ? 'Already have an account? Login'
                                : "Don't have an account? Sign up"}
                        </span>
                        <button
                            className="button infoButton"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? 'Loading...'
                                : isSignUp
                                ? 'Sign Up'
                                : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
