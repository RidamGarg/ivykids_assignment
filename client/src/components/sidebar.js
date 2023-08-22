import React, { useState } from "react";
import LogoWBg from "../assets/media/twitter-original-logo.svg";
import HomeFilledImg from "../assets/media/homeFilled.svg";
import SearchImg from "../assets/media/search.svg";
import NotificatonImg from "../assets/media/notification.svg";
import MessagesImg from "../assets/media/messages.svg";
import BookMarksImg from "../assets/media/bookmarks.svg";
import ListsImg from "../assets/media/lists.svg";
import VerifiedImg from "../assets/media/verified.svg";
import ProfileImg from "../assets/media/profile.svg";
import MoreImg from "../assets/media/more.svg";
import CreatePost from "./createPost";
import { useNavigate } from "react-router-dom";
function Sidebar(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    sessionStorage.setItem("userToken", "");
    window.location.reload();
    navigate("/");
  };
  return (
    <div className="mt-sidemenu">
      <img src={LogoWBg} alt="Mini-Twitter" id="mt-mini-twitter-logo" />
      <div className="mt-sidemenu-items">
        <div className="mt-sidemenu-item mts-1">
          <img src={HomeFilledImg} alt="home" />
          <p>Home</p>
        </div>
        <div className="mt-sidemenu-item mts-3">
          <img src={SearchImg} alt="home" />
          <p>Explore</p>
        </div>
        <div className="mt-sidemenu-item mts-4">
          <img src={NotificatonImg} alt="home" />
          <p>Notification</p>
        </div>
        <div className="mt-sidemenu-item mts-5">
          <img src={MessagesImg} alt="home" />
          <p>Messages</p>
        </div>
        <div className="mt-sidemenu-item mts-6">
          <img src={ListsImg} alt="home" />
          <p>Lists</p>
        </div>
        <div className="mt-sidemenu-item mts-7">
          <img src={BookMarksImg} alt="home" />
          <p>Bookmarks</p>
        </div>
        <div className="mt-sidemenu-item mts-8">
          <img src={VerifiedImg} alt="home" />
          <p>Verified</p>
        </div>
        <div className="mt-sidemenu-item mts-9">
          <img src={ProfileImg} alt="home" />
          <p>Profile</p>
        </div>
        <div className="mt-sidemenu-item mts-10">
          <img src={MoreImg} alt="home" />
          <p>More</p>
        </div>
        <div className="mt-sidemenu-item mts-11" onClick={handleShow}>
          <p>Tweet</p>
        </div>
        <div className="mt-sidemenu-item mts-12">
          <img src={ProfileImg} alt="home" />
          <div className="mt-userdetails">
            <p>Settings</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        </div>
      </div>
      <CreatePost show={show} handleClose={handleClose} setShow={setShow} />
    </div>
  );
}

export default Sidebar;
