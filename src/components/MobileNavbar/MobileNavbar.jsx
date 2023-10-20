import React from "react";
import "./MobileNavbar.scss";
import { AiFillHome } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillHeartFill, BsFillGridFill } from "react-icons/bs";
import { FaUser, FaMountain } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../api/firebase";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    pathname: "/",
    label: "홈",
    icon: <AiFillHome />,
  },
  {
    pathname: "/moment",
    label: "모먼트",
    icon: <BsFillGridFill />,
  },
  {
    pathname: "/remonth",
    label: "월간지",
    icon: <FaMountain />,
  },
];

export default function MobileNavbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  return (
    <div className="mobile-navbar">
      <ul className="flex">
        {tabs.map((tab) => (
          <li
            className={location.pathname === tab.pathname ? "selected" : ""}
            onClick={() => navigate(tab.pathname)}
          >
            {tab.icon}
            {tab.label}
            {location.pathname === tab.pathname ? (
              <motion.div className="underline" layoutId="underline" />
            ) : null}
          </li>
        ))}
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
