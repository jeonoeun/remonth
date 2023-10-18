import React from "react";
import "./MobileNavbar.scss";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { SiAlpinedotjs } from "react-icons/si";
import { BsFillHeartFill, BsFillGrid1X2Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const navigate = useNavigate();

  return (
    <div className="mobile-navbar">
      <ul className="flex">
        <li onClick={() => navigate("/")}>
          <AiFillHome />
          <span>홈</span>
        </li>
        <li onClick={() => navigate("/moment")}>
          <SiAlpinedotjs />
          <span>모먼트</span>
        </li>
        <li onClick={() => navigate("/remonth")}>
          <BsFillGrid1X2Fill />
          <span>월간지</span>
        </li>
        <li onClick={() => navigate("/mypage")}>
          <BsFillHeartFill />
          <span>마이</span>
        </li>
      </ul>
    </div>
  );
}
