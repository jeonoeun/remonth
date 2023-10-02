import React from "react";
import "./Home.scss";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { SiAlpinedotjs } from "react-icons/si";
import { BsFillHeartFill, BsFillGrid1X2Fill } from "react-icons/bs";

export default function Home() {
  return (
    <div className="home">
      <div className="mobile-navbar">
        <ul className="flex">
          <li>
            <AiFillHome />
            <span>홈</span>
          </li>
          <li>
            <BsFillGrid1X2Fill />
            <span>월간지</span>
          </li>
          <li>
            <SiAlpinedotjs />
            <span>모먼트</span>
          </li>
          <li>
            <BsFillHeartFill />
            <span>마이</span>
          </li>
          <li>
            <AiOutlineMenu />
            <span>전체</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
