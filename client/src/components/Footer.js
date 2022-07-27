import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () =>{

    return(
        <div>

        <p>Website by The Dudes <span> &copy; </span> 2022</p>

            <Link to="/">Contact Us</Link>


        </div>
    )
}

export default Footer;