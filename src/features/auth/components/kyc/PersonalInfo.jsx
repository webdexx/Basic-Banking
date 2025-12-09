import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import "./kyc-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPersonalInfo } from "./postPersonalDetails";
import { toast } from "react-toastify";
import { clearPostPersonalInfoStatus } from "./postPersonalInfoSlice";

export default function PersonalInfo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [correspondence, setCorrespondence] = useState(false);
  const [kycFormData, setKycFormData] = useState({
    gender: "",
    dob: "",
    nationality: "Indian",
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    correspondenceAddress: {
      sameAsPermanent: correspondence,
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const { personalInfo, documents } = useSelector((state) => state.kyc);


  const { isAuth, accountStatus } = useSelector((state) => state.auth);

  const { success, error, loading } = useSelector(
    (state) => state.postPersonalInfo
  );

  useEffect(() => {
    document.title = "Complete Your KYC First - Basic Banking";
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!kycFormData.gender) {
      newErrors.gender = "gender is required";
    }

    if (!kycFormData.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!kycFormData.nationality) {
      newErrors.nationality = "Nationality is required";
    } else if (kycFormData.nationality.trim().toUpperCase() !== "INDIAN") {
      newErrors.nationality =
        "Only Indian citizens are allowed to open an account with Basic Banking";
    }

    if (!kycFormData.permanentAddress.street.trim()) {
      newErrors.permStreet = "Street cannot be empty";
    }

    if (!kycFormData.permanentAddress.city.trim()) {
      newErrors.permCity = "City can't be empty";
    }

    if (!kycFormData.permanentAddress.state.trim()) {
      newErrors.permState = "Choose State";
    }

    if (!kycFormData.permanentAddress.pincode.trim()) {
      newErrors.permPinCode = "Pin-code can't be empty";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();``

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await dispatch(postPersonalInfo(kycFormData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("✅ Personal details saved successfully!");
      dispatch(clearPostPersonalInfoStatus());
      if (personalInfo === "COMPLETE" && documents === "ACTIVE") {
      navigate("/professional-details", { replace: true });
    }
    }

    if (error) {
      toast.error(error);
      dispatch(clearPostPersonalInfoStatus());
    }
  }, [success, error, dispatch]);

  return (
    <div className="kyc__form__container">
      <Motion.form className="form" onSubmit={handleSubmit}>
        <h1>Personal Information Form</h1>
        {step === 1 && (
          <div className="">
            <div className="form-section">
              <h2>Basic Information</h2>

              <div className="form-group">
                <div className="input__container">
                  <label>Gender</label>
                  <div className="radio-wrapper">
                    <label htmlFor="male">
                      <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="MALE"
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            gender: e.target.value,
                          });
                          if (errors.gender)
                            setErrors({ ...errors, gender: "" });
                        }}
                      />
                      <span className="name">Male</span>
                    </label>
                    <label htmlFor="female">
                      <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            gender: e.target.value,
                          });
                          if (errors.gender)
                            setErrors({ ...errors, gender: "" });
                        }}
                      />
                      <span className="name">Female</span>
                    </label>
                    <label htmlFor="others">
                      <input
                        id="others"
                        type="radio"
                        name="gender"
                        value="OTHER"
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            gender: e.target.value,
                          });
                          if (errors.gender)
                            setErrors({ ...errors, gender: "" });
                        }}
                      />
                      <span className="name">Others</span>
                    </label>
                    {errors.gender && (
                      <span className="login-error">**{errors.gender}**</span>
                    )}
                  </div>
                </div>
                <div className="input_container">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    name="dob"
                    value={kycFormData.dob}
                    onChange={(e) => {
                      setKycFormData({
                        ...kycFormData,
                        dob: e.target.value,
                      });
                      if (errors.dob) setErrors({ ...errors, dob: "" });
                    }}
                  />
                  {errors.dob && (
                    <span className="login-error">**{errors.dob}**</span>
                  )}
                </div>
                <div className="input_container">
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    value={kycFormData.nationality}
                    onChange={(e) => {
                      setKycFormData({
                        ...kycFormData,
                        nationality: e.target.value,
                      });
                      if (errors.nationality)
                        setErrors({ ...errors, nationality: "" });
                    }}
                  />
                  {errors.nationality && (
                    <span className="login-error">
                      **{errors.nationality}**
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="">
            <div className="form-section">
              <h2>Permanent Address</h2>
              <div className="address-grid">
                <div className="form-group">
                  <div className="input_container">
                    <label htmlFor="permStreet">Street</label>
                    <input
                      type="text"
                      id="permStreet"
                      placeholder="Enter street address"
                      name="permStreet"
                      value={kycFormData.permanentAddress.street}
                      onChange={(e) => {
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            street: e.target.value,
                          },
                        });
                        if (errors.permStreet)
                          setErrors({ ...errors, permStreet: "" });
                      }}
                    />
                    {errors.permStreet && (
                      <span className="login-error">
                        **{errors.permStreet}**
                      </span>
                    )}
                  </div>
                </div>

                <div className="address-grid-two">
                  <div className="input_container">
                    <label htmlFor="permCity">City</label>
                    <input
                      type="text"
                      id="permCity"
                      placeholder="Enter city"
                      name="permCity"
                      value={kycFormData.permanentAddress.city}
                      onChange={(e) => {
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            city: e.target.value,
                          },
                        });
                        if (errors.permCity)
                          setErrors({ ...errors, permCity: "" });
                      }}
                    />
                    {errors.permCity && (
                      <span className="login-error">**{errors.permCity}**</span>
                    )}
                  </div>

                  <div className="input_container">
                    <label htmlFor="permState">State</label>
                    <input
                      type="text"
                      id="permState"
                      placeholder="Enter state"
                      name="permState"
                      value={kycFormData.permanentAddress.state}
                      onChange={(e) => {
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            state: e.target.value,
                          },
                        });
                        if (errors.permState)
                          setErrors({ ...errors, permState: "" });
                      }}
                    />
                    {errors.permState && (
                      <span className="login-error">
                        **{errors.permState}**
                      </span>
                    )}
                  </div>
                </div>

                <div className="address-grid-two">
                  <div className="input_container">
                    <label htmlFor="permCountry">Country</label>
                    <input
                      type="text"
                      id="permCountry"
                      placeholder="Enter country"
                      name="permCountry"
                      value={kycFormData.permanentAddress.country}
                      onChange={(e) => {
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>

                  <div className="input_container">
                    <label htmlFor="permPinCode">Pincode</label>
                    <input
                      type="text"
                      id="permPinCode"
                      placeholder="Enter pincode"
                      value={kycFormData.permanentAddress.pincode}
                      onChange={(e) => {
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            pincode: e.target.value,
                          },
                        });
                        if (errors.permPinCode)
                          setErrors({ ...errors, permPinCode: "" });
                      }}
                    />
                    {errors.permPinCode && (
                      <span className="login-error">
                        **{errors.permPinCode}**
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => setStep(step - 1)}>
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(step + 1);
                setCorrespondence(false);
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="">
            <div className="form-section">
              <h2>Correspondence Address</h2>

              <div className="switch-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="sameAsPermanent"
                    name="sameAsPermanent"
                    checked={correspondence}
                    onChange={() => {
                      const newValue = !correspondence;
                      setCorrespondence(newValue);
                      setKycFormData({
                        ...kycFormData,
                        correspondenceAddress: {
                          ...kycFormData.correspondenceAddress,
                          sameAsPermanent: newValue,
                        },
                      });
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <span className="switch-label">Same as Permanent Address</span>
              </div>
              {!correspondence && (
                <div className="address-grid">
                  <div className="form-group">
                    <div className="input_container">
                      <label htmlFor="corrStreet">Street</label>
                      <input
                        type="text"
                        id="corrStreet"
                        placeholder="Enter street address"
                        name="corrStreet"
                        value={kycFormData.correspondenceAddress.street}
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            correspondenceAddress: {
                              ...kycFormData.correspondenceAddress,
                              street: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="address-grid-two">
                    <div className="input_container">
                      <label htmlFor="corrCity">City</label>
                      <input
                        type="text"
                        id="corrCity"
                        placeholder="Enter city"
                        name="corrCity"
                        value={kycFormData.correspondenceAddress.city}
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            correspondenceAddress: {
                              ...kycFormData.correspondenceAddress,
                              city: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="corrState">State</label>
                      <input
                        type="text"
                        id="corrState"
                        placeholder="Enter state"
                        name="corrState"
                        value={kycFormData.correspondenceAddress.state}
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            correspondenceAddress: {
                              ...kycFormData.correspondenceAddress,
                              state: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="address-grid-two">
                    <div className="input_container">
                      <label htmlFor="corrCountry">Country</label>
                      <input
                        type="text"
                        id="corrCountry"
                        placeholder="Enter country"
                        name="corrCountry"
                        value={kycFormData.correspondenceAddress.country}
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            correspondenceAddress: {
                              ...kycFormData.correspondenceAddress,
                              country: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="corrPinCode">Pincode</label>
                      <input
                        type="text"
                        id="corrPinCode"
                        placeholder="Enter pincode"
                        value={kycFormData.correspondenceAddress.pincode}
                        onChange={(e) => {
                          setKycFormData({
                            ...kycFormData,
                            correspondenceAddress: {
                              ...kycFormData.correspondenceAddress,
                              pincode: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              Prev
            </button>
            <button type="Submit" disabled={loading}>
               {loading ? "Submitting" : "Submit"} 
            </button>
          </div>
        )}
      </Motion.form>
    </div>
  );
}
