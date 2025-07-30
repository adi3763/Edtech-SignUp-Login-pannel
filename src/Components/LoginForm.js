import { useState } from "react";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function LoginForm({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [formData, setForm] = useState({
        email:"",
        password:""
    });

    const [showPassword,setShowPassword] = useState(false);

    let changeHandler = (e)=>{
        setForm((prev)=>({
            ...prev,
            [e.target.name] : e.target.value, 
        }))

    }

    function submitHandler(e){
        e.preventDefault();
        console.log(formData);
        setIsLoggedIn(true);
        toast.success("You are successfully Logged In")
        navigate("/dashboard");

    }

    return (
        <div>
            <div className="login-form">
                <form onSubmit={submitHandler}>
                <label>
                    <div className="email">Email <span className="required">*</span></div>
                    <input type="text"
                    required
                    name="email"
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={changeHandler}
                    
                    />
                </label>

                <label>
                    <div className="password">password<span className="required">*</span></div>
                    <input type={showPassword ? ("text") : ("password")}
                    value={formData.password}
                    placeholder="Enter Your Password"
                    onChange={changeHandler}
                    name="password"
                    required
                    />
                    {
                        showPassword ? (<button className="hideBtn" onClick={(e)=>{e.preventDefault();setShowPassword(false)}}>Hide</button>) : (<button className="showBtn" onClick={(e)=>{e.preventDefault();setShowPassword(true)}}>Show</button>)
                    }
                </label>
<br></br>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;