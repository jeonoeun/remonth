import React from "react";
import "./Builder.scss";
import { useLocation, useNavigate } from "react-router-dom";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Header from "../../components/Header/Header";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  BsMusicNote,
  BsFillCameraVideoFill,
  BsFillCupHotFill,
  BsFillTreeFill,
  BsFillBasketFill,
  BsFillChatDotsFill,
  BsEggFried,
  BsPeopleFill,
  BsTsunami,
} from "react-icons/bs";

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="builder">
      <Header />
      <div className="builder-ct">
        <div className="flex builder-title">
          <button onClick={() => navigate(-1)}>
            <MdKeyboardArrowLeft />
          </button>
          {location.pathname === "/builder/1" ? (
            <p className="title">카테고리</p>
          ) : (
            <p className="title">등록하기</p>
          )}
        </div>
        {location.pathname === "/builder/1" ? (
          <div className="builder-category-list">
            <ul className="list">
              <li>
                <span>노래</span>
                <BsMusicNote />
              </li>
              <li>
                <span>영상</span>
                <BsFillCameraVideoFill />
              </li>
              <li>
                <span>음식</span>
                <BsFillCupHotFill />
              </li>
              <li>
                <span>소비</span>
                <BsFillBasketFill />
              </li>
              <li>
                <span>공간</span>
                <BsFillTreeFill />
              </li>
              <li>
                <span>운동</span>
                <BsTsunami />
              </li>
              <li>
                <span>순간</span>
                <BsEggFried />
              </li>
              <li>
                <span>한마디</span>
                <BsFillChatDotsFill />
              </li>
              <li>
                <span>사람</span>
                <BsPeopleFill />
              </li>
            </ul>
            <div className="flex">
              <button onClick={() => navigate("/builder/2")}>다음</button>
            </div>
          </div>
        ) : (
          <p className="title">등록하기</p>
        )}
      </div>
      <MobileNavbar />
    </div>
  );
}
