import "./login.css";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Recover Password";
  }, []);

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  return (
    <>
      <Motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="loginForm"
      >
        <h3>Recover your account</h3>
        {step === 1 &&
        <>
            <input name="email" placeholder="Email" />
            <button onClick={handleNext}>Next</button>
        </>
        
        }
        {step === 2 &&
        <>
        <input name="mobile" placeholder="Enter your Mobile Number" />
        <button onClick={handleNext}>Generate OTP</button>
        </>
        
        }
        {step === 3 &&
        <>
        <input name="otp" placeholder="Enter OTP" />
        <button onClick={handleNext}>Submit</button>
        </>
        
        }
      </Motion.form>

      <p className="signup-link">
        Forgot email?
        <Link to="/" className="authLink">Contact Us</Link>
      </p>
    </>
  );
}