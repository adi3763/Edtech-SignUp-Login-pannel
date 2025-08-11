import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { Accept: "application/json" },
  });

  const [formData, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function changeHandler(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    // 1) clear any stale token so it can't “fake” success
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // 2) ensure backend actually provided a token
      const { token, user } = res.data || {};
      if (!token) {
        throw new Error("No token returned from API.");
      }

      // 3) Save token and (optional) verify it by hitting /api/user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user || null));

      // OPTIONAL but recommended: verify token
      try {
        const me = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!me?.data?.id) throw new Error("Token verification failed");
      } catch {
        // if verification fails, clean up and throw
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Invalid token or verification failed.");
      }

      setIsLoggedIn?.(true);
      toast.success(`Welcome back, ${user?.first_name || "User"}!`);
      navigate("/dashboard");
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors &&
          Object.values(err.response.data.errors).flat().join("\n"));

      toast.error(apiMsg || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <label>
            <div className="email">Email <span className="required">*</span></div>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={changeHandler}
            />
          </label>

          <label>
            <div className="password">Password <span className="required">*</span></div>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter Your Password"
                onChange={changeHandler}
                required
              />
              <button
                type="button"
                className={showPassword ? "hideBtn" : "showBtn"}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
