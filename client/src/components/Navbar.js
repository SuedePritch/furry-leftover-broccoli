// navbar css file
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) =>{
    // function pageChange(event){
    //     const id = event.target.id;
    //     props.setPage(id);
    // }

return (
    <div>
        <h1>Website Title</h1>
        
        {/* thinking drop down for categories */}
        <nav>
  <ul>
    <li><Link to="/">Categories</Link></li>
      <ul>
        <li><Link to="/">Clothes</Link></li>
        <li><Link to="/">Tech</Link></li>
        <li><Link to="/">BBQ</Link></li>
        <li><Link to="/">Tools</Link></li>
        <li><Link to="/">Clothes Again</Link></li>
        </ul>
        <li>Login/Logout</li>
        <li>Sign Up</li>
        </ul></nav>
      

    </div>
)
};

export default Navbar;