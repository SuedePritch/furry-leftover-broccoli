// navbar css file
import './Navbar.css';

const Navbar = (props) =>{
    function pageChange(event){
        const id = event.target.id;
        props.setPage(id);
    }

return (
    <div>
        <h1>Website Title</h1>
        
        {/* thinking drop down for categories */}
        <nav>
  <ul>
    <li><a href="#">Categories</a></li>
      <ul>
        <li><a href="#">Clothes</a></li>
        <li><a href="#">Tech</a></li>
        <li><a href="#">BBQ</a></li>
        <li><a href="#">Tools</a></li>
        <li><a href="#">Clothes Again</a></li>
        </ul>
        <li>Login/Logout</li>
        <li>Sign Up</li>
        </ul></nav>
      

    </div>
)
};

export default Navbar;