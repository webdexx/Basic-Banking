import Logo from "@assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  MdOutlineSettings,
  MdNotifications,
  MdNotificationAdd,
  MdEmail
} from "react-icons/md";
import { useState } from "react";
import './header.css'
import ProfileIcon from "./components/ProfileIcon";

export default function Header() {
  const [notification, setNotification] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
          <Link to="/" className="header__icon">
            <MdOutlineSettings />
          </Link>

          <Link to="#" className="header__icon">
            <MdEmail />
          </Link>
          <Link to="#" className="header__icon">
            {notification === true ? (
              <MdNotificationAdd onClick={(e) => {
                e.preventDefault();
                setNotification(true);
                setNotificationOpen(true);
              }} />
            ) : (
              <MdNotifications onClick={(e) => {
                e.preventDefault();
                setNotification(false);
                setNotificationOpen(false);
              }}/>
            )}
            {notificationOpen && (
              <div className="floating-container" onClick={() => setNotificationOpen(false)}>
                <p>Floating Window</p>
              </div>
            )

            }
          </Link>
          <Link to="#">
            <ProfileIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
