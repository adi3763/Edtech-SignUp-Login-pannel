import signup from '../assets/signup.png';
import Template from '../Components/Template';
function Signup({setIsLoggedIn}){
    return(
<div>
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signup}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    /></div>
    );
}

export default Signup;