// navbar css file
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import logoSimple from '../assets/images/Binoculars.svg'


const Navbar = (props) =>{
    // function pageChange(event){
    //     const id = event.target.id;
    //     props.setPage(id);
    // }

return (
    <div className='navbar-container'>
        <Link to="/" className="logo-title">
            <h1>STOCKER</h1>
            <img src={logoSimple} alt='logosimple'/>
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