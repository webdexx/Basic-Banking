import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import "./kyc-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearPostProfessionalInfoStatus } from "./postProfessionalInfoSlice";
import { postProfessionalInfo } from "./postProfessionalDetails";
import { fetchKYC } from "./fetchKYC";

export default function ProfessionalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [professionalFormData, setProfessionalFormData] = useState({
    panNumber: "",
    aadhaarNumber: "",
    occupation: "",
    monthlyIncome: "",
  });

  const { personalInfo, documents } = useSelector((state) => state.kyc);

  const [errors, setErrors] = useState({});

  const { success, error, loading } = useSelector(
    (state) => state.postProfessionalInfo
  );

  useEffect(() => {
    document.title = "Complete Your KYC First - Basic Banking";
  }, []);

  useEffect(() => {
    if (personalInfo === "COMPLETE" && documents === "COMPLETE") {
      navigate("/pending-review", { replace: true });
    }
  }, [personalInfo, documents, navigate]);

  const validateForm = () => {
    const newErrors = {};

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const pan = professionalFormData.panNumber?.trim().toUpperCase();

    if (!pan) {
      newErrors.pan = "PAN is required";
    } else if (!panRegex.test(pan)) {
      newErrors.pan = "PAN format is invalid (Example: ABCDE1234F)";
    }

    const aadhaarRegex = /^\d{12}$/;
    const aadhaar = professionalFormData.aadhaarNumber?.trim();

    if (!aadhaar) {
      newErrors.aadhaar = "Aadhaar number is required";
    } else if (!aadhaarRegex.test(aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be a 12-digit number";
    }

    if (!professionalFormData.occupation) {
      newErrors.occupation = "Occupation is required";
    }

    if (!professionalFormData.monthlyIncome) {
      newErrors.monthlyIncome = "Monthly income is required";
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
      await dispatch(postProfessionalInfo(professionalFormData));
      await dispatch(fetchKYC());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("✅ KYC Details saved successfully!");
      dispatch(clearPostProfessionalInfoStatus());
    }

    if (error) {
      toast.error(error);
      dispatch(clearPostProfessionalInfoStatus());
    }
  }, [success, error, dispatch]);

  return (
    <div className="kyc__form__container">
      <Motion.form className="form" onSubmit={handleSubmit}>
        <h1>
          Add Professional Information - Personal Details : {personalInfo}
        </h1>
        <div className="">
          <div className="form-section">
            <div className="form-group">
              <div className="input_container">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  placeholder="Enter Pan Number"
                  name="panNumber"
                  value={professionalFormData.panNumber}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      panNumber: e.target.value,
                    });
                    if (errors.pan) setErrors({ ...errors, panNumber: "" });
                  }}
                />
                {errors.pan && (
                  <span className="login-error">**{errors.pan}**</span>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                <input
                  type="text"
                  placeholder="Enter Aadhaar Number"
                  name="aadhaarNumber"
                  value={professionalFormData.aadhaarNumber}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      aadhaarNumber: e.target.value,
                    });
                    if (errors.aadhaar) setErrors({ ...errors, aadhaar: "" });
                  }}
                />
                {errors.aadhaar && (
                  <span className="login-error">**{errors.aadhaar}**</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="input_container">
                <label htmlFor="occupation">Occupation</label>
                <select
                  id="occupation"
                  value={professionalFormData.occupation}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      occupation: e.target.value,
                    });
                    if (errors?.occupation) {
                      setErrors({ ...errors, occupation: "" });
                    }
                  }}
                >
                  <option value="">Select Occupation</option>
                  <option value="SALARIED">Salaried</option>
                  <option value="SELF_EMPLOYED">Self Employed</option>
                  <option value="STUDENT">Student</option>
                  <option value="BUSINESS">Business</option>
                  <option value="HOUSEWIFE">Housewife</option>
                  <option value="RETIRED">Retired</option>
                  <option value="OTHER">Other</option>
                </select>

                {errors?.occupation && (
                  <span className="login-error">**{errors.occupation}**</span>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="monthlyIncome">Monthly Income</label>
                <select
                  id="monthlyIncome"
                  value={professionalFormData.monthlyIncome}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      monthlyIncome: e.target.value,
                    });
                    if (errors?.monthlyIncome) {
                      setErrors({ ...errors, monthlyIncome: "" });
                    }
                  }}
                >
                  <option value="">Select Monthly Income</option>
                  <option value="BELOW_25000">Below ₹25,000</option>
                  <option value="25000-50000">₹25,000 – ₹50,000</option>
                  <option value="50000-100000">₹50,000 – ₹1,00,000</option>
                  <option value="100000-200000">₹1,00,000 – ₹2,00,000</option>
                  <option value="ABOVE_200000">Above ₹2,00,000</option>
                </select>

                {errors?.monthlyIncome && (
                  <span className="login-error">
                    **{errors.monthlyIncome}**
                  </span>
                )}
              </div>
            </div>

            <button type="Submit" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        </div>
      </Motion.form>
    </div>
  );
}
