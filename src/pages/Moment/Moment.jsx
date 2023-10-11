import React from "react";
import "./Moment.scss";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Moment() {
  const moments = useSelector((state) => state.moments.moments);
  const navigate = useNavigate();

  return (
    <div className="moment">
      <Header />
      <div className="content">
        <div className="title-ct"></div>
        <div className="momentList-ct">
          {moments.map((card) => (
            <div
              className="moment-card"
              onClick={() => navigate(`/${card.id}`)}
            >
              <img src={card.image} alt="" className="card-img" />
              <div className="card-info">
                <p className="card-title">{card.title}</p>
                <div className="user flex">
                  <img src={card.user.image} alt="" className="user-img" />
                  <p>{card.user.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}
