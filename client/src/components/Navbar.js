// navbar css file
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) =>{
    // function pageChange(event){
    //     const id = event.target.id;
    //     props.setPage(id);
    // }

return (
    <div className='navbar-container'>
        <h1>Inventory Management</h1>
        
  <ul>
        <li><Link to="/">Categories</Link></li>
        <li><Link to="/">Clothes</Link></li>
        <li><Link to="/">Tech</Link></li>
        <li><Link to="/">BBQ</Link></li>
        <li><Link to="/">Tools</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        
  </ul>
      

    </div>
)
};

export default Navbar;