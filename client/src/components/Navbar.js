// navbar css file
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import logoSimple from '../assets/images/Binoculars.svg';
import jwtdecode from 'jwt-decode';
import { useState, useEffect } from 'react';


const Navbar = (props) =>{
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const token = localStorage.getItem('id_token')
        

        useEffect(() => {
            if(token){
                setLoggedIn(true)
                setIsAdmin(jwtdecode(token).data.isAdmin)
            }else if(!token){
                return
            }
        }, [loggedIn, isAdmin, token])
        


    const signout = () =>{
        localStorage.clear()
        setLoggedIn(false)
        setIsAdmin(false)
    }

return (
    <div className='navbar-container'>
        <Link to="/" className="logo-title">
            <h1>STOCKER</h1>
            <img src={logoSimple} alt='logosimple'/>
        </Link>
        
<ul>
    {isAdmin ?
            <li><Link to="/admin">Admin</Link></li>
            : <li><Link to="/category">Home</Link></li>
        }

    {loggedIn ?  <li onClick={signout}>Log Out</li>
    :
        <li><Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/signup">Signup</Link></li>
}
  </ul>
        
        
      

    </div>
)
};

export default Navbar;