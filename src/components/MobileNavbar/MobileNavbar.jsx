import React from "react";
import "./MobileNavbar.scss";
import { AiFillHome } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillHeartFill, BsFillGridFill } from "react-icons/bs";
import { FaUser, FaMountain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../api/firebase";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="mobile-navbar">
      <ul className="flex">
        <li onClick={() => navigate("/")}>
          <AiFillHome />
          <span>홈</span>
        </li>
        <li onClick={() => navigate("/moment")}>
          <BsFillGridFill />
          <span>모먼트</span>
        </li>
        <li onClick={() => navigate("/remonth")}>
          <FaMountain />
          <span>월간지</span>
        </li>
        {currentUser ? (
          <li onClick={() => navigate("/mypage")}>
            <BsFillHeartFill />
            <span>마이</span>
          </li>
        ) : (
          <li onClick={login}>
            <FaUser />
            <span>로그인</span>
          </li>
        )}
      </ul>
    </div>
  );
}
