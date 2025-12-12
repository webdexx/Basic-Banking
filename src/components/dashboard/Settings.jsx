import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./settings.css";

import {
  LuUserRound,
  LuSettings,
  LuShieldCheck,
  LuBadgeCheck,
  LuSquareUserRound,
  LuKeyRound,
  LuMap,
  LuIndianRupee,
  LuMail,
  LuCrown,
  LuPhoneForwarded,
  LuNewspaper,
  LuSquareCheckBig,
  LuTrash2,
} from "react-icons/lu";

import Profile from "@assets/images/profile.jpg";
import Card from "@components/dashboard/components/Card";
import { fetchFullKyc } from "@/features/auth/components/kyc/fetchKYC";

export default function Settings() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("accountInfo");

  const {
    userFullName,
    userEmail,
    userMobile,
    userPermanentAddress,
    userDOB,
    userGender,
  } = useSelector((state) => state.kyc);

  useEffect(() => {
    dispatch(fetchFullKyc());
  }, [dispatch]);

  useDocumentTitle("Settings");

  return (
    <div className="settings-container">
      <button className="tab-btn" onClick={() => setActiveTab("accountInfo")}>
        <LuUserRound /> Account
      </button>
      <button className="tab-btn" onClick={() => setActiveTab("settings")}>
        <LuSettings /> Settings
      </button>
      <button className="tab-btn" onClick={() => setActiveTab("privacy")}>
        <LuShieldCheck /> Privacy
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
                <h3>
                  {userFullName} <LuBadgeCheck className="icon" />
                  <p className="sub-text">Primary Account Holder</p>
                </h3>
              </div>

              {/* <p>{email}</p> */}
            </div>
            <div className="user-profile-gapper"></div>
          </div>

          <Card className="info__container">
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
                <LuUserRound className="icon" /> {userGender}
              </p>
              <p>
                <LuMail className="icon" />{" "}
                {userDOB
                  ? `${userDOB.split("-")[2]}/${userDOB.split("-")[1]}/${
                      userDOB.split("-")[0]
                    }`
                  : "Loading"}
              </p>
              <p>
                <LuUserRound className="icon" /> {userGender}
              </p>
            </div>
          </Card>
          <Card
            className="info__container personalInfo"
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
              <button className="pill-success-dark">Password & Security</button>
            </Card>
            <Card className="settings__card pill-warning">
              <div className="settings__icon">
                <LuCrown size={54} />
              </div>
              <button className="pill-warning-dark">Get Premium</button>
            </Card>
            <Card className="settings__card pill-error">
              <div className="settings__icon">
                <LuMap size={54} />
              </div>
              <button className="pill-error-dark">Update Address</button>
            </Card>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Card className="settings__card pill-info">
              <div className="settings__icon">
                <LuIndianRupee size={54} />
              </div>
              <button className="pill-info-dark">Money Management</button>
            </Card>
            <Card className="settings__card pill-purple">
              <div className="settings__icon">
                <LuNewspaper size={54} />
              </div>
              <button className="pill-purple-dark">Reports</button>
            </Card>
            <Card className="settings__card pill-neutral">
              <div className="settings__icon">
                <LuSquareCheckBig size={54} />
              </div>
              <button className="pill-neutral-dark">Request KYC Verification</button>
            </Card>
          </div>
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
            <p>
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
            </p>
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
  );
}
