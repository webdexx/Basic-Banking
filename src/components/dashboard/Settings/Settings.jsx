import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./settings.css";

import {
  LuUserRound,
  LuSettings,
  LuShieldCheck,
  LuBadgeCheck,
  LuKeyRound,
  LuMap,
  LuIndianRupee,
  LuMail,
  LuCrown,
  LuPhoneForwarded,
  LuNewspaper,
  LuSquareCheckBig,
  LuCalendarHeart,
  LuCircleDashed,
} from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";

import Profile from "@assets/images/profile.jpg";
import Card from "@components/dashboard/components/Card";
import { fetchFullKyc } from "@/features/auth/components/kyc/fetchKYC";
import PasswordSetting from "./components/PasswordSetting";
import PremiumServiceForm from "./components/PremiumServiceForm";
import AddressUpdateForm from "./components/AddressUpdateForm";

export default function Settings() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("accountInfo");

  const [modalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useDocumentTitle("Settings");

  const userFullName = useSelector((s) => s.kyc.userFullName);
  const userEmail = useSelector((s) => s.kyc.userEmail);
  const userMobile = useSelector((s) => s.kyc.userMobile);
  const userPermanentAddress = useSelector((s) => s.kyc.userPermanentAddress);
  const userDOB = useSelector((s) => s.kyc.userDOB);
  const userGender = useSelector((s) => s.kyc.userGender);

  useEffect(() => {
    if (!userFullName) {
      dispatch(fetchFullKyc());
    }
  }, [dispatch, userFullName]);

  return (
    <>
      <div className="settings-container">
        <button
          className={
            activeTab === "accountInfo" ? "tab-btn active-tab-btn" : "tab-btn"
          }
          onClick={() => setActiveTab("accountInfo")}
        >
          <LuUserRound className="tab-icon" size={19} /> Account
        </button>
        <button
          className={
            activeTab === "settings" ? "tab-btn active-tab-btn" : "tab-btn"
          }
          onClick={() => setActiveTab("settings")}
        >
          <LuSettings className="tab-icon" size={19} /> Settings
        </button>
        <button
          className={
            activeTab === "privacy" ? "tab-btn active-tab-btn" : "tab-btn"
          }
          onClick={() => setActiveTab("privacy")}
        >
          <LuShieldCheck className="tab-icon" size={19} /> Privacy
        </button>
        {activeTab === "accountInfo" && (
          <div className="accountInfo">
            <h1>Account Info</h1>

            <div className="user-profile-container">
              <div className="profile-header">
                <h1
                  className="white-text"
                  style={{ textAlign: "center", marginTop: "4rem" }}
                >
                  Account Holder
                </h1>
              </div>
              <div className="user-profile">
                <img src={Profile} alt="" />
                <div className="info">
                  <span>
                    <h3>
                      {userFullName} <LuBadgeCheck className="icon" />
                    </h3>
                    <p className="sub-text">Primary Account Holder</p>
                  </span>
                </div>
              </div>
              <div className="user-profile-gapper"></div>
            </div>

            <Card className="info__container__settings">
              <div className="personalInfo">
                <p>
                  <LuUserRound className="icon" /> {userFullName}
                </p>
                <p>
                  <LuMail className="icon" /> {userEmail}
                </p>
                <p>
                  <LuPhoneForwarded className="icon" /> Mobile No: {userMobile}
                </p>
              </div>
              <div className="otherInfo">
                <p>
                  <LuCircleDashed className="icon" /> {userGender}
                </p>
                <p>
                  <LuCalendarHeart className="icon" />{" "}
                  {userDOB
                    ? `${userDOB.split("-")[2]}/${userDOB.split("-")[1]}/${
                        userDOB.split("-")[0]
                      }`
                    : "Loading"}
                </p>
                <p></p>
              </div>
            </Card>
            <Card
              className="info__container__settings personalInfo"
              style={{ padding: "40px" }}
            >
              <p>
                <b>Permanent Address:</b> {userPermanentAddress}
              </p>
              <hr />
              <p>
                <b>Correspondence Address:</b> {userPermanentAddress}
              </p>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings_container">
            <h1>Settings</h1>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Card className="settings__card pill-success">
                <div className="settings__icon">
                  <LuKeyRound size={54} />
                </div>
                <button
                  className="pill-success-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("password");
                  }}
                >
                  Password & Security
                </button>
              </Card>
              <Card className="settings__card pill-warning">
                <div className="settings__icon">
                  <LuCrown size={54} />
                </div>
                <button
                  className="pill-warning-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("premium");
                  }}
                >
                  Get Premium
                </button>
              </Card>
              <Card className="settings__card pill-error">
                <div className="settings__icon">
                  <LuMap size={54} />
                </div>
                <button
                  className="pill-error-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("address");
                  }}
                >
                  Update Address
                </button>
              </Card>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Card className="settings__card pill-info">
                <div className="settings__icon">
                  <LuIndianRupee size={54} />
                </div>
                <button
                  className="pill-info-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("money");
                  }}
                >
                  Money Management
                </button>
              </Card>
              <Card className="settings__card pill-purple">
                <div className="settings__icon">
                  <LuNewspaper size={54} />
                </div>
                <button
                  className="pill-purple-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("reports");
                  }}
                >
                  Reports
                </button>
              </Card>
              <Card className="settings__card pill-neutral">
                <div className="settings__icon">
                  <LuSquareCheckBig size={54} />
                </div>
                <button
                  className="pill-neutral-dark btn"
                  onClick={() => {
                    setModalOpen(true);
                    setActiveModal("kycVerification");
                  }}
                >
                  Request for ReKYC
                </button>
              </Card>
            </div>
            {modalOpen && (
              <div className="box-modal-backdrop">
                <div className="box-modal">
                  {activeModal === "password" && <PasswordSetting />}
                  {activeModal === "premium" && <PremiumServiceForm />}
                  {activeModal === "address" && <AddressUpdateForm />}
                  {activeModal === "money" && <h2>Coming Soon..</h2>}
                  {activeModal === "reports" && <h2>Coming Soon</h2>}
                  {activeModal === "kycVerification" && <h2>Coming Soon..</h2>}
                  <button
                    className="box-close"
                    onClick={() => setModalOpen(false)}
                  >
                    <MdOutlineClose size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="settings_container">
            <h1>Privacy</h1>
            <Card style={{ padding: "40px 50px" }}>
              <h1>Introduction</h1>
              <p>
                Welcome to <b>Basic Banking</b> ("we," "our," or "us"). We are
                committed to protecting your privacy and personal information.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our website/application.
              </p>
              <hr />
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>

              <ol>
                <li>
                  Name and Contact Details: We collect your name, email address,
                  phone number, and mailing address when you register for our
                  services.
                </li>
                <li>
                  Demographic Information: Age, gender, date of birth, and
                  occupation.
                </li>
                <li>
                  Identification Documents: PAN number, Aadhaar number, or other
                  government-issued IDs for verification purposes (where
                  applicable).
                </li>
              </ol>
            </Card>
            <div
              style={{
                background: "var(--theme-blue)",
                height: "50px",
                borderRadius: "10px",
              }}
            >
              <p
                className="white-text"
                style={{ textAlign: "center", padding: "15px" }}
              >
                Please refer to our website page as well
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
