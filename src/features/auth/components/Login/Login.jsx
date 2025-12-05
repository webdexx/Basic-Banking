import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@features/auth/loginUser";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      document.title = "Basic Banking - Login";
    }, []);

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await  dispatch(loginUser(email, password));
    } catch (error) {
    console.error("Login failed:", error);
      // Show error message to user
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <Motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="loginForm"
        onSubmit={handleLogin}
      >
        <h3>Login Here</h3>
        {error && <p className="error-message">{error}</p>}
        <input name="email" placeholder="Email" disabled={loading} />
        <input name="password" placeholder="Password" type="password" disabled={loading} />
        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        
        

        <Link to="/forgot-password" className="authLink">Forgot Password?</Link>
      </Motion.form>

      <p className="signup-link">
        Don't have an account?
        <Link to="/register" className="authLink">Signup</Link>
      </p>
    </>
  );
}