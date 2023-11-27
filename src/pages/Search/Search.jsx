import React from "react";
import "./Search.scss";
import toolIcon from "../../images/tool.png";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  return (
    <div className="search">
      <div className="inner">
        <img src={toolIcon} alt="" />
        <p>
          <strong>페이지 준비중입니다</strong>
        </p>
        <button onClick={() => navigate("/")}>홈으로 가기</button>
      </div>
    </div>
  );
}
