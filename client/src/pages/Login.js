import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
// Import Mutation for login
import { LOGIN_USER } from '';
// Import auth from utils
import Auth from '';

import { validateEmail } from '../utils/helpers';
import '../styles/Login.css';

const LoginForm = () => {
    // BUILD MUTATION FOR LOGIN_USER
    const [login, { error }] = useMutation(LOGIN_USER);
    const [userFormData, setUserFormData] = useState({ email: '', password: ''});

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const userMutationResponse = await login ({
                variables: { email: userFormData.email, password: userFormData.password},
            });
            const token = userMutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const emailIsValid = (e) =>{
        if (!validateEmail(e.value)){
          alert('Please enter an actual email');
        };
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    return (
        <div className='login-form-container'>
            <h2 className='login-form-title'>Login</h2>
            <form className='login-form' onSubmit={handleFormSubmit}>
                <div className='login-email'>
                    <label htmlFor='email'>Email Address:</label>
                    <input placeholder='insert@email.com' name= 'email' type='email' id='email' 
                        onBlur={emailIsValid}
                        onChange={handleChange}></input>
                </div>
                <div className='login-password'>
                    <label htmlFor='pwd'>Password:</label>
                    <input placeholder='*******' name='password' type='password' id='password'
                        onChange={handleChange}></input>
                </div>
                <button type='submit'>Login </button>
            </form>
        </div>
    )
}

export default LoginForm