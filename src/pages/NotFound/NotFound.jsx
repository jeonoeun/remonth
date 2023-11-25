import React from "react";
import "./NotFound.scss";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <div className="inner">
        <div className="icon">!</div>
        <p>
          <strong>앗, 존재하지 않는 길이에요.</strong>
        </p>
        <p>죄송하지만 주소가 바뀌거나 사라진 것 같아요.</p>
        <p>정확한 주소인지 다시 한번 확인해 주세요.</p>
        <button onClick={() => navigate("/")}>홈으로 가기</button>
      </div>
    </div>
  );
}
