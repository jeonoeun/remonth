import React from "react";
import "./Builder.scss";
import { useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";

export default function Builder() {
  const navigate = useNavigate();
  const card = useSelector((state) => state.card.card);

  return (
    <div className="builder">
      <Header />
      <div className="builder-ct">
        <div className="flex builder-title">
          <button onClick={() => navigate(-1)}>
            <MdKeyboardArrowLeft />
          </button>
          <p className="title">등록하기</p>
        </div>
        <div className="form-area">
          <div className="block">
            <p className="block-title">카테고리</p>
            <ul className="builder-category-list">
              <li>
                <span>노래</span>
              </li>
              <li>
                <span>영상</span>
              </li>
              <li>
                <span>음식</span>
              </li>
              <li>
                <span>소비</span>
              </li>
              <li>
                <span>공간</span>
              </li>
              <li>
                <span>운동</span>
              </li>
              <li>
                <span>순간</span>
              </li>
              <li>
                <span>한마디</span>
              </li>
              <li>
                <span>사람</span>
              </li>
            </ul>
          </div>
          <input type="date" defaultValue={card.date}></input>
        </div>
        <button className="button" onClick={() => navigate("/builder")}>
          등록하기
        </button>
      </div>
      <MobileNavbar />
    </div>
  );
}
