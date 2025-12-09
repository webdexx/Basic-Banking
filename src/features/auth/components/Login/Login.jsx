import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/components/Login/loginUser";
import { resetRegisterState } from "../Register/registerSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, error, loading, authStatus, accountStatus } = useSelector(
    (state) => state.auth
  );

  const { isSuccess } = useSelector((state) => state.registerUser);

  const [formError, setFormError] = useState("");

  useEffect(() => {
    document.title = "Basic Banking - Login";
  }, []);

  useEffect(() => {
    if (isAuth) {
      console.log("User Authenticated. Account Status:", accountStatus);

      switch (accountStatus) {
        case "APPROVED":
          navigate("/dashboard");
          break;
        case "PENDING":
          navigate("/kyc/personal-info");
          break;
        case "REJECTED":
          navigate("/kyc/review");
          break;
        case "PENDING_REVIEW":
          navigate("/kyc/review");
          break;
        default:
          navigate("/kyc/personal-info");
          break;
      }
    }
  }, [isAuth, accountStatus, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setFormError("Please enter both email and password");
      return;
    }

    try {
      await dispatch(loginUser(email, password));
    } catch (error) {
      console.error("Login failed:", error.message);
      setFormError(error.message || "Login Failed. Try Again");
      // Show error message to user
    } finally {
      console.log("Loaded");
    }
  };


  const handleLinkClick = (e) => {
    console.log("Link clicked!", e);
    e.preventDefault();
    dispatch(resetRegisterState());
    navigate("/register");
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
        {isSuccess && <p className="login-success">Please Login to Continue</p>}
        <input name="email" placeholder="Email" disabled={loading} />
        <input
          name="password"
          placeholder="Password"
          type="password"
          disabled={loading}
        />
        <button disabled={loading} style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && !formError && <p className="login-error">🚨 {error}</p>}
        {formError && <p className="login-error">🚨 {formError}</p>}
        {authStatus && !error && <p className="login-success">{authStatus}</p>}

        <Link to="/forgot-password" className="authLink">
          Forgot Password?
        </Link>
      </Motion.form>

      <p className="signup-link">
        Don't have an account?
        <Link 
          to="/register" 
          onClick={handleLinkClick}
          className="authLink"
        >
          Create a new Account
        </Link>
      </p>
    </>
  );
}
