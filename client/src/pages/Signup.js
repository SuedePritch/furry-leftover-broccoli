import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_USER } from '../utils/mutations.js';
import Auth from '../utils/auth.js';

// sign up css file
import '../styles/Signup.css';

const Signup = () =>{
    // BUILD MUTATION FOR LOGIN_USER
    const [addUser] = useMutation(ADD_USER);
    const [signupFormData, setSignupFormData] = useState({ email: '', password: ''});

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
          const userMutationResponse = await addUser ({
              variables: { username: signupFormData.username, email: signupFormData.email, password: signupFormData.password},
          });
            const token = userMutationResponse.data.addUser.token;
          Auth.login(token);
      } catch (e) {
        console.log(e)
          alert('Email or Username already taken')
      }
  };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setSignupFormData({
          ...signupFormData,
          [name]: value,
      });
  };

return(
  <div className='signup-form-container'>
  <h2 className='signup-form-title'>Signup</h2>
  <form className='signup-form' onSubmit={handleFormSubmit}>
      <div className='signup'>
          <label htmlFor='username'>Username</label>
          <input placeholder='Username' name= 'username' type='username' id='username' 
              onChange={handleChange}></input>
      </div>
      <div className='signup'>
          <label htmlFor='email'>Email Address:</label>
          <input placeholder='Email' name= 'email' type='email' id='email' 
              onChange={handleChange}></input>
      </div>
      <div className='signup'>
          <label htmlFor='pwd'>Password:</label>
          <input placeholder='Password' name='password' type='password' id='password'
              onChange={handleChange}></input>
      </div>
      <button type='submit'>signup </button>
  </form>
</div>
)
}

export default Signup;