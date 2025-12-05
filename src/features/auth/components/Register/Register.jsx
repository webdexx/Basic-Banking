import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";

export default function Register() {
  
  useEffect(() => {
      document.title = "Create new account";
    }, []);

  return (
    <>
      <Motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Register here</h3>
        <input name="firstName" placeholder="Enter Your Firstname" />
        <input name="LastName" placeholder="Enter Your Lastname" />
        <input name="email" placeholder="Enter Your Email" />
        <input name="password" placeholder="Password" type="password" />
        <button>Create Account</button>
      </Motion.form>
      <p className="signup-link">
        Already have an account?
        <Link to="/" className="authLink">
          Login
        </Link>
      </p>
    </>
  );
}
