import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './signup.css';


function SignupForm(){

    let navigate = useNavigate();
    const [showPasswords,setShowPasswords] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const [formData, setForm] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"student"
    });

    function changeHandler(e){
        setForm((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value,
            }
        ));
    }

    function submitHandler(e){
        e.preventDefault();
        console.log(formData);
 if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return ;
        }

        // setIsLoggedIn(true);
        toast.success("Account Created");
        const accountData = {
            ...formData
        };
        console.log("printing account data ");
        console.log(accountData);

        navigate("/login");  
      }

      function handleRoleChange(selectedRole) {
  setForm((prev) => ({
    ...prev,
    role: selectedRole,
  }));
}


    return(
        <div className="signup-container">
            <form onSubmit={submitHandler}>

<div className="chooseBtns">
  <button
    type="button"
    onClick={() => handleRoleChange("student")}
    className={formData.role === "student" ? "active" : ""}
  >
    Student
  </button>

  <button
    type="button"
    onClick={() => handleRoleChange("instructor")}
    className={formData.role === "instructor" ? "active" : ""}
  >
    Instructor
  </button>
</div>

            <div className="signup-form">
                <label>
                    First Name
                    <input type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter Your First Name"
                    onChange={changeHandler}
                    required
                    />
                </label>
                <label>
                Last Name
                    <input type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter Your Last Name"
                    onChange={changeHandler}
                    required
                    />
                </label>

                                <label>
               Email
                    <input type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={changeHandler}
                    required
                    />
                </label>

                <label>
                password
                    <input type={showPasswords ? ("text") : ("password")}
                    name="password"
                    value={formData.password}
                    placeholder="Enter Your Password Name"
                    onChange={changeHandler}
                    required
                    />
                    {
                        showPasswords ? (<button className="hide-btn" onClick={(e)=>{e.preventDefault(); setShowPasswords(false)}}>Hide</button>) : (<button className="showBtn" onClick={(event)=>{event.preventDefault(); setShowPasswords(true)}}>Show</button>)
                    }
                </label>
                <br></br>
<label>
                Confirm Password
                    <input type={showConfirmPassword ? ("text") : ("password")}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Enter Your Password Name"
                    onChange={changeHandler}
                    required
                    />
                    {
                        showConfirmPassword ? (<button className="hide-btn"  onClick={(e)=>{e.preventDefault();setShowConfirmPassword(false)}}>Hide</button>) : (<button className="showBtn" onClick={(e)=>{e.preventDefault();setShowConfirmPassword(true)}}>Show</button>)
                    }
                </label>
            </div>
            <br></br>

            <button>Submit</button>
                        </form>

        </div>
        
    )
}

export default SignupForm;