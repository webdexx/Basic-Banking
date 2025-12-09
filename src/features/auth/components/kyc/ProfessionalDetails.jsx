import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import "./kyc-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearPostPersonalInfoStatus } from "./postPersonalInfoSlice";
import { postProfessionalInfo } from "./postProfessionalDetails";

export default function ProfessionalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [professionalFormData, setProfessionalFormData] = useState({
    panNumber: "",
    aadhaarNumber: "",
    occupation: "",
    monthlyIncome: "",
  });

  const [errors, setErrors] = useState(null);

  const { success, error, loading } = useSelector(
    (state) => state.postProfessionalInfo
  );

  console.log(success);
  console.log(error);
  console.log(loading);

  useEffect(() => {
    document.title = "Complete Your KYC First - Basic Banking";
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!professionalFormData.panNumber) {
      newErrors.pan = "PAN is required";
    }

    if (!professionalFormData.aadhaarNumber) {
      newErrors.aadhaar = "aadhaarNumber is required";
    }

    if (!professionalFormData.occupation) {
      newErrors.occupation = "Occupation is required";
    }

    if (!professionalFormData.monthlyIncome) {
      newErrors.permStreet = "Please select your Income Group. It is required";
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("✅ Personal details saved successfully!");
      dispatch(clearPostPersonalInfoStatus());
    }

    if (error) {
      toast.error(error);
      dispatch(clearPostPersonalInfoStatus());
    }
  }, [success, error, dispatch]);

  //   useEffect(() => {
  //     if (personalInfo === "COMPLETE" && documents === "ACTIVE") {
  //       navigate("/professional-details", { replace: true });
  //     }
  //   }, [personalInfo, documents, navigate]);

  return (
    <div className="kyc__form__container">
      <Motion.form className="form" onSubmit={null}>
        <h1>Add Professional Information</h1>
        <div className="">
          <div className="form-section">
            <div className="form-group">
              <div className="input_container">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  value={professionalFormData.nationality}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      nationality: e.target.value,
                    });
                    if (errors.nationality)
                      setErrors({ ...errors, nationality: "" });
                  }}
                />
                {errors.nationality && (
                  <span className="login-error">**{errors.nationality}**</span>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  value={professionalFormData.nationality}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      nationality: e.target.value,
                    });
                    if (errors.nationality)
                      setErrors({ ...errors, nationality: "" });
                  }}
                />
                {errors.nationality && (
                  <span className="login-error">**{errors.nationality}**</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="input_container">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  value={professionalFormData.nationality}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      nationality: e.target.value,
                    });
                    if (errors.nationality)
                      setErrors({ ...errors, nationality: "" });
                  }}
                />
                {errors.nationality && (
                  <span className="login-error">**{errors.nationality}**</span>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  value={professionalFormData.nationality}
                  onChange={(e) => {
                    setProfessionalFormData({
                      ...professionalFormData,
                      nationality: e.target.value,
                    });
                    if (errors.nationality)
                      setErrors({ ...errors, nationality: "" });
                  }}
                />
                {errors.nationality && (
                  <span className="login-error">**{errors.nationality}**</span>
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
