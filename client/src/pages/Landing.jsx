import React from 'react'
import '../styles/Landing.css'
import Logo from '../components/Logo'

function Landing() {
    setTimeout(() => {
        window.location.assign('/category');
    }, 2000);
  return (
    <div className='landing-page-container'>
        <div className="landing-page-logo">
            <Logo/>
            <h2>"Keeping an eye on your inventory"</h2>
        </div>
    </div>
  )
}

export default Landing