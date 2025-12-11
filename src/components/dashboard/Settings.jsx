import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./settings.css";

import { LuUserRound, LuSettings, LuShieldCheck } from "react-icons/lu";

import Profile from "@assets/images/profile.jpg";
export default function Settings() {
  const [activeTab, setActiveTab] = useState("accountInfo");

  const { accountNumber, status, user } = useSelector(
    (state) => state.account
  );

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
          <div className="user-profile">
            <img src={Profile} alt="" />
            <h3>{user}</h3>
            {/* <p>{email}</p> */}
          </div>
          <div className="info__container">
            <p>{accountNumber}</p>
            <p>{status}</p>
          </div>
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
