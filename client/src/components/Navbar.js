// navbar css file
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import Logo from './Logo'

const Navbar = (props) =>{
    // function pageChange(event){
    //     const id = event.target.id;
    //     props.setPage(id);
    // }

return (
    <div className='navbar-container'>
        <Link to="/" className="logo-title">
            <Logo/>
            <h1>1nv3nt0ry</h1>
        </Link>
        
  <ul>
        <li><Link to="/admin">ADMIN</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        
        
  </ul>
      

    </div>
)
};

export default Navbar;