// an email validation from helpers
import { validateEmail } from '../utils/helpers';

// sign up css file
import '../styles/Signup.css';

const Signup = () =>{

    const form = useRef();

    const emailIsValid = (e) =>{
        if (!validateEmail(e.value)){
          alert('Please enter an actual email');
        };
      };

return(
    <div className='signup-fprm'>
      <form ref={form}>
        <ul>
      <li>    
      <label>Username</label>
      <input type="text" name="username"/>
      </li>
      
      <li>
      <label>Email</label>
      <input type="email" name="user_email" onBlur={emailIsValid} />
      </li>
     
      <li>
        <label>Password</label>
       <textarea name="password" />
            
      </li>
      <li>
      <input id="submit-button" type="submit" value="SUBMIT" />
      </li>
       </ul>
    </form>
   </div>
)
}

export default Signup;