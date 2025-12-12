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
  LuMail,
  LuPhoneForwarded,
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
    userCorrespondenceAddress,
    userPAN,
    userAadhar,
    userDOB,
    userGender,
    userOccupation,
    userMonthlyIncome,
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
                {`${userDOB.split("-")[2]}/${userDOB.split("-")[1]}/${
                  userDOB.split("-")[0]
                }`}
              </p>
              <p>
                <LuUserRound className="icon" /> {userGender}
              </p>
            </div>
          </Card>
          <Card className="info__container personalInfo" style={{padding: "40px"}}>
            <p><b>Permanent Address:</b> {userPermanentAddress}</p>
            <hr />
            <p><b>Correspondence Address:</b> {userPermanentAddress}</p>
          </Card>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="settings_container">
          <h1>Settings</h1>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="settings_container">
          <h1>Privacy</h1>
        </div>
      )}
    </div>
  );
}
