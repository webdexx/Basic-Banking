import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./signupUser";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, error } = useSelector(
    (state) => state.registerUser
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  
  useEffect(() => {
    document.title = "Create new account";
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "Firstname is Required";
    }

    if (!formData.lastName && formData.lastName.length <= 0) {
      newErrors.lastName = "Lastname is Required";
    }

    if (!formData.email && formData.email.length <= 0) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobileNo) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (formData.mobileNo.length < 10) {
      newErrors.mobileNo = "Mobile Number must be of 10 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one letter and one number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await dispatch(signupUser(formData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  // useEffect(() => {
  //   if(error) {
  //     setErrors({error});
  //   }
  // }, [error]);

  return (
    <>
      <Motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        <h3>Register here</h3>
        <input
          name="firstName"
          placeholder="Enter Your Firstname"
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
            if (errors.firstName) setErrors({ ...errors, firstName: "" });
          }}
        />
        {errors.firstName && (
          <span className="login-error">**{errors.firstName}**</span>
        )}

        <input
          name="lastName"
          placeholder="Enter Your Lastname"
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
            if (errors.lastName) setErrors({ ...errors, lastName: "" });
          }}
        />
        {errors.lastName && (
          <span className="login-error">**{errors.lastName}**</span>
        )}

        <input
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
        />

        {errors.email && (
          <span className="login-error">**{errors.email}**</span>
        )}

        <input
          name="mobileNo"
          placeholder="Enter Your Mobile Number"
          onChange={(e) => {
            setFormData({ ...formData, mobileNo: e.target.value });
            if (errors.mobileNo) setErrors({ ...errors, mobileNo: "" });
          }}
        />
        {errors.mobileNo && (
          <span className="login-error">**{errors.mobileNo}**</span>
        )}

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
        />
        {errors.password && (
          <span className="login-error">**{errors.password}**</span>
        )}
        {isLoading && <p className="login-msg">Sending Data to the server</p>}
        <button>Create Account</button>
        {error && <p className="login-error">**{error}**</p>}
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
