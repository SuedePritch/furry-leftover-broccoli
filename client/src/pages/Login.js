import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN_USER } from '../utils/mutations.js';
import Auth from '../utils/auth.js';

// import { validateEmail } from '../utils/helpers';
import '../styles/Login.css';

const LoginForm = () => {
    // BUILD MUTATION FOR LOGIN_USER
    const [login] = useMutation(LOGIN_USER);
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

    // const emailIsValid = (e) =>{
    //     if (!validateEmail(e.value)){
    //       alert('Please enter an actual email');
    //     };
    //   };

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
                <div className='login'>
                    <label htmlFor='email'>Email Address:</label>
                    <input placeholder='insert@email.com' name= 'email' type='email' id='email' 
                        // onBlur={emailIsValid}
                        onChange={handleChange}></input>
                </div>
                <div className='login'>
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