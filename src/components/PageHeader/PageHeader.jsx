import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./PageHeader.scss";
import { useDispatch } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { setCurrentUser } from "../../store/user";
import { logout } from "../../api/firebase";

export default function PageHeader() {
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
      <p className="page-name">모먼트</p>
      {location.pathname === "/mypage" ? (
        <button className="logout-button" onClick={handleLogout}>
          <AiFillSetting />
        </button>
      ) : null}
    </div>
  );
}
