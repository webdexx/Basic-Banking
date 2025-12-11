import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import "./kyc-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPersonalInfo } from "./postPersonalDetails";
import { toast } from "react-toastify";
import { clearPostPersonalInfoStatus } from "./postPersonalInfoSlice";
import { fetchKYC } from "./fetchKYC";

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Complete Your KYC First - Basic Banking";
  }, []);

  const { personalInfo, documents } = useSelector((state) => state.kyc);

  useEffect(() => {
    if (personalInfo === "COMPLETE" && documents === "ACTIVE") {
      navigate("/professional-info", { replace: true });
    }
  }, [personalInfo, documents, navigate]);

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
      country: "India",
      pincode: "",
    },
    correspondenceAddress: {
      sameAsPermanent: correspondence,
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },
  });

  const { success, error, loading } = useSelector(
    (state) => state.postPersonalInfo
  );

  const [errors, setErrors] = useState({});

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birthday hasn’t happened yet this year → subtract 1
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };


  // async function validatePincode(pincode) {
  //   const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  //   const data = await res.json();
  //   console.log(data);
  //   return data[0].Status === "Success";
  // }


  const validateField = (name, value) => {
    switch (name) {
      case "gender": {
        if (!value) return "Gender is required";
        return "";
      }

      case "dob": {
        if (!value) return "Date of Birth is required";
        const age = calculateAge(value);

        if (age < 5) {
          return "You must be at least 5 years old for an Account";
        }

        return "";
      }

      case "nationality": {
        if (!value) return "Nationality is required";
        if (value.trim().toUpperCase() !== "INDIAN") {
          return "Only Indian citizens are allowed to open an account with Basic Banking";
        }
        return "";
      }

      case "permStreet": {
        const trimmedStreet = value.trim();
        if (!trimmedStreet || trimmedStreet.length < 15)
          return "Address must be atleast 15 characters";
        return "";
      }

      case "permCity": {
        if (!value.trim()) return "City can't be empty";
        return "";
      }

      case "permState": {
        if (!value.trim()) return "Choose State";
        return "";
      }

      case "permPinCode": {
        if (!value.trim()) return "Pin-code can't be empty";
        if (!/^\d{6}$/.test(value)) return "PIN must be 6 digits";
        // const validPin = validatePincode(value);
        // if(!validPin) return "Please enter a valid Pin Code";
        return "";
      }

      case "corrStreet": {
        const trimmedStreet = value.trim();
        if (!trimmedStreet || trimmedStreet.length < 15)
          return "Address must be atleast 15 characters";
        return "";
      }

      case "corrCity": {
        if (!value.trim()) return "City can't be empty";
        return "";
      }

      case "corrState": {
        if (!value.trim()) return "Choose State";
        return "";
      }

      case "corrPinCode": {
        if (!value.trim()) return "Pin-code can't be empty";
        if (!/^\d{6}$/.test(value)) return "PIN must be 6 digits";
        return "";
      }

      default:
        return "";
    }
  };

  const validateStep1 = (formData) => {
    const newErrors = {};

    const genderError = validateField("gender", formData.gender, formData);
    if (genderError) newErrors.gender = genderError;

    const dobError = validateField("dob", formData.dob, formData);
    if (dobError) newErrors.dob = dobError;

    const nationalityError = validateField(
      "nationality",
      formData.nationality,
      formData
    );
    if (nationalityError) newErrors.nationality = nationalityError;

    return newErrors;
  };

  const validateStep2 = (formData) => {
    const newErrors = {};

    const streetError = validateField(
      "permStreet",
      formData.permanentAddress.street,
      formData
    );
    if (streetError) newErrors.permStreet = streetError;

    const cityError = validateField(
      "permCity",
      formData.permanentAddress.city,
      formData
    );
    if (cityError) newErrors.permCity = cityError;

    const stateError = validateField(
      "permState",
      formData.permanentAddress.state,
      formData
    );
    if (stateError) newErrors.permState = stateError;

    const pincodeError = validateField(
      "permPinCode",
      formData.permanentAddress.pincode,
      formData
    );
    if (pincodeError) newErrors.permPinCode = pincodeError;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postPersonalInfo(kycFormData));
      await dispatch(fetchKYC());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Personal details saved successfully!", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearPostPersonalInfoStatus());
    }

    if (error) {
      toast.error(error);
      dispatch(clearPostPersonalInfoStatus());
    }
  }, [success, error, dispatch, personalInfo, documents, navigate]);

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
                          const value = e.target.value;
                          setKycFormData({
                            ...kycFormData,
                            gender: value,
                          });

                          const errorMsg = validateField("gender", value);
                          setErrors((prev) => ({ ...prev, gender: errorMsg }));
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
                          const value = e.target.value;
                          setKycFormData({
                            ...kycFormData,
                            gender: value,
                          });

                          const errorMsg = validateField("gender", value);
                          setErrors((prev) => ({ ...prev, gender: errorMsg }));
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
                          const value = e.target.value;
                          setKycFormData({
                            ...kycFormData,
                            gender: value,
                          });

                          const errorMsg = validateField("gender", value);
                          setErrors((prev) => ({ ...prev, gender: errorMsg }));
                        }}
                      />
                      <span className="name">Others</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="form-error">*{errors.gender}</span>
                  )}
                </div>
                <div className="input_container">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    name="dob"
                    value={kycFormData.dob}
                    onChange={(e) => {
                      const value = e.target.value;
                      setKycFormData({
                        ...kycFormData,
                        dob: value,
                      });

                      const errorMsg = validateField("dob", value);
                      setErrors((prev) => ({ ...prev, dob: errorMsg }));
                    }}
                  />
                  {errors.dob && (
                    <span className="form-error">*{errors.dob}</span>
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
                      const value = e.target.value;
                      setKycFormData({
                        ...kycFormData,
                        nationality: value,
                      });

                      const errorMsg = validateField("nationality", value);
                      setErrors((prev) => ({ ...prev, nationality: errorMsg }));
                    }}
                  />
                  {errors.nationality && (
                    <span className="form-error">
                      *{errors.nationality}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const validationErrors = validateStep1(kycFormData);

                if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
                }

                setStep(step + 1);
              }}
            >
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
                    <label htmlFor="permStreet">Address</label>
                    <input
                      type="text"
                      id="permStreet"
                      placeholder="Enter street address"
                      name="permStreet"
                      value={kycFormData.permanentAddress.street}
                      onChange={(e) => {
                        const value = e.target.value;

                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            street: value,
                          },
                        });

                        const errorMsg = validateField("permStreet", value);
                        setErrors((prev) => ({
                          ...prev,
                          permStreet: errorMsg,
                        }));
                      }}
                    />
                    {errors.permStreet && (
                      <span className="form-error">
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
                        const value = e.target.value;

                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            city: value,
                          },
                        });

                        const errorMsg = validateField("permCity", value);
                        setErrors((prev) => ({
                          ...prev,
                          permCity: errorMsg,
                        }));
                      }}
                    />
                    {errors.permCity && (
                      <span className="form-error">**{errors.permCity}**</span>
                    )}
                  </div>

                  <div className="input_container">
                    <label htmlFor="permState">State</label>
                    <select
                      id="permState"
                      name="permState"
                      value={kycFormData.permanentAddress.state}
                      onChange={(e) => {
                        const value = e.target.value;
                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            state: value,
                          },
                        });

                        const errorMsg = validateField("permState", value);
                        setErrors((prev) => ({
                          ...prev,
                          permState: errorMsg,
                        }));
                      }}
                    >
                      <option value="" disabled>Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>

                    </select>
                    {errors.permState && (
                      <span className="form-error">
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
                        const value = e.target.value;

                        setKycFormData({
                          ...kycFormData,
                          permanentAddress: {
                            ...kycFormData.permanentAddress,
                            pincode: value,
                          },
                        });

                        const errorMsg = validateField("permPinCode", value);
                        setErrors((prev) => ({
                          ...prev,
                          permPinCode: errorMsg,
                        }));
                      }}
                    />
                    {errors.permPinCode && (
                      <span className="form-error">
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
                const validationErrors = validateStep2(kycFormData);

                if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
                }

                setStep(step + 1);
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
