import Logo from "@assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  MdLogout,
  MdOutlineSettings,
  MdNotifications,
  MdNotificationAdd,
  MdEmail,
  MdMarkEmailUnread 
} from "react-icons/md";
import { useState } from "react";
import './header.css'
import ProfileIcon from "./components/ProfileIcon";

export default function Header() {
  const [notification, setNotification] = useState(true);
  return (
    <>
      <div className="header">
        <div className="header__brand">
          <img src={Logo} alt="" />
        </div>

        <div className="search__container">
          <input type="text" placeholder="Search Here.." />
        </div>

        <div className="header__menu">
          {notification}
          <Link to="/" className="header__icon">
            <MdOutlineSettings />
          </Link>
          <Link to="/" className="header__icon">
            <MdEmail />
          </Link>
          <Link to="#" className="header__icon">
            {notification === true ? (
              <MdNotificationAdd onClick={() => setNotification(false)} />
            ) : (
              <MdNotifications />
            )}
          </Link>
          <Link to="/">
            <ProfileIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
