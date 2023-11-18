import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./PageHeader.scss";
import { useDispatch } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { setCurrentUser } from "../../store/user";
import { logout } from "../../api/firebase";
import { IoMdSettings } from "react-icons/io";

export default function PageHeader({
  matchedItem,
  isModal,
  setIsModal,
  currentUser,
  title,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    dispatch(setCurrentUser(null));
  };

  return (
    <div className="title flex">
      <button onClick={() => navigate(-1)}>
        <MdKeyboardArrowLeft />
      </button>
      <p className="page-name">{title}</p>
      {location.pathname.includes("/moment") &&
        matchedItem &&
        matchedItem.user.id === currentUser.id && (
          <button className="setting-btn" onClick={() => setIsModal(!isModal)}>
            <IoMdSettings />
          </button>
        )}
      {location.pathname === "/mypage" ? (
        <button className="logout-button" onClick={handleLogout}>
          <AiFillSetting />
        </button>
      ) : null}
    </div>
  );
}
