import React from "react";
import "./MobileNavbar.scss";
import { AiFillHome } from "react-icons/ai";
import { BsFillHeartFill, BsFillGridFill } from "react-icons/bs";
import { FaUser, FaMountain } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../api/firebase";
import { motion } from "framer-motion";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  return (
    <div className="mobile-navbar">
      <ul className="flex">
        <li
          className={location.pathname.includes("") ? "selected" : ""}
          onClick={() => navigate("/")}
        >
          <AiFillHome />
          <span>홈</span>
          {location.pathname.includes("/") ? (
            <motion.div className="underline" layoutId="underline" />
          ) : null}
        </li>
        <li
          className={location.pathname.includes("moment") ? "selected" : ""}
          onClick={() => navigate("/moment")}
        >
          <BsFillGridFill />
          <span>모먼트</span>
          {location.pathname.includes("moment") ? (
            <motion.div className="underline" layoutId="underline" />
          ) : null}
        </li>
        <li
          className={location.pathname.includes("remonth") ? "selected" : ""}
          onClick={() => navigate("/remonth")}
        >
          <FaMountain />
          <span>월간지</span>
          {location.pathname.includes("remonth") ? (
            <motion.div className="underline" layoutId="underline" />
          ) : null}
        </li>
        {currentUser ? (
          <li
            className={location.pathname === "/mypage" ? "selected" : ""}
            onClick={() => navigate("/mypage")}
          >
            <BsFillHeartFill />
            <span>마이</span>
            {location.pathname === "/mypage" ? (
              <motion.div className="underline" layoutId="underline" />
            ) : null}
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
