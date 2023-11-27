import React from "react";
import "./MobileNavbar.scss";
import { AiFillHome } from "react-icons/ai";
import { BsFillHeartFill, BsFillGridFill } from "react-icons/bs";
import { FaUser, FaMountain } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/firebase";

export default function MobileNavbar({ currentUser }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="mobile-navbar">
      <ul className="flex">
        <li
          className={pathname === "/" ? "selected" : ""}
          onClick={() => navigate("/")}
        >
          <AiFillHome />
          <span>홈</span>
        </li>
        <li
          className={pathname === "/search" ? "selected" : ""}
          onClick={() => navigate("/search")}
        >
          <FiSearch />
          <span>검색</span>
        </li>
        <li
          className={pathname.includes("moment") ? "selected" : ""}
          onClick={() => navigate("/moment")}
        >
          <BsFillGridFill />
          <span>모먼트</span>
        </li>
        <li
          className={pathname.includes("remonth") ? "selected" : ""}
          onClick={() => navigate("/remonth")}
        >
          <FaMountain />
          <span>월간지</span>
        </li>
        {currentUser ? (
          <li
            className={pathname === "/mypage" ? "selected" : ""}
            onClick={() => navigate("/mypage")}
          >
            <BsFillHeartFill />
            <span>마이</span>
          </li>
        ) : (
          <li onClick={() => navigate("/login")}>
            <FaUser />
            <span>로그인</span>
          </li>
        )}
      </ul>
    </div>
  );
}
