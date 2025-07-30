import frame from '../assets/frame.png';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './Templatr.css';


function Template({title, desc1, desc2, image, formtype, setIsLoggedIn}) {
    return (
        <div className='container'>
            <div className="right-part">
                <h1>{title}</h1>
                 <p>
                <span>{desc1}</span>
                <span>{desc2}</span>
                </p>

                <div className='forms'>
                    {
                        formtype === 'signup' ? (<SignupForm setIsLoggedIn={setIsLoggedIn}/>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)
                    }
                </div>

                 <div>
                <div></div>
                <p>OR</p>
                <div></div>
            </div>

<button>
  <i className="fab fa-google"></i>
  <p>Sign Up with Google</p>
</button>
            </div>

            <div className="left-part">
                 <img src={frame}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"/>

            <img src={image}
                alt="Students"
                width={558}
                height={490}
                loading="lazy"/>    
            </div>
        </div>
    );
}

export default Template;