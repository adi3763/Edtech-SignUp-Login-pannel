import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './signup.css';
import axios from "axios";


function SignupForm(){

    let navigate = useNavigate();
    const [showPasswords,setShowPasswords] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const api = axios.create({
        baseURL : "http://localhost:8000/api",
          headers: { Accept: "application/json" },

    })

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

   async function submitHandler(e){
        e.preventDefault();
        console.log(formData);
 if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return ;
        }

        try{
            const res = await api.post("/register",{
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword, // important!
        role: formData.role,
            });

            const { token, user } = res.data || {};
    //   if (!token) {
    //     throw new Error("No token returned from API.");
    //   }

      // Save token for subsequent requests
      localStorage.setItem("token", token);

      toast.success(`Welcome, ${user?.first_name || formData.firstName}!`);
              navigate("/login");
        }
        catch(err){
            let apiMsg = null;
            if (err?.response?.data?.message) {
                apiMsg = err.response.data.message;
            } else if (err?.response?.data?.errors) {
                apiMsg = Object.values(err.response.data.errors)
                    .flat()
                    .join("\n");
            }

            toast.error(apiMsg || "Signup failed. Please try again.");
            console.error("Signup error:", err);
        }
        
        
        

        
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