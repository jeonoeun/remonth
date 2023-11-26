import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import "./Home.scss";
import { IoIosArrowForward } from "react-icons/io";
import categoryList from "../../data";

export default function Home({ userMoments }) {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("노래");

  return (
    <div className="home">
      <div className="content">
        <Calendar userMoments={userMoments} />
        <div className="moment-box">
          <div className="title-area flex">
            <div>
              <p className="box-title">10월의 모먼트</p>
              <p className="sum-title">
                총{" "}
                {userMoments &&
                  userMoments.filter((item) => item.category === selectedTag)
                    .length}
                개의 {selectedTag} 모먼트가 있어요
              </p>
            </div>
            <button onClick={() => navigate("/moment")}>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="category-ct flex">
            <ul className="list-ct flex">
              {categoryList.map((item) => (
                <li
                  className={item.type === selectedTag ? "on" : ""}
                  key={item.type}
                  onClick={() => setSelectedTag(item.type)}
                >
                  {item.type}
                </li>
              ))}
            </ul>
          </div>
          {userMoments &&
            userMoments
              .filter((item) => item.category === selectedTag)
              .map((card) => (
                <div
                  key={card.id}
                  className="card-item"
                  onClick={() => navigate(`moment/${card.id}`)}
                >
                  <div className="img-ct">
                    <img src={card.image} alt="" />
                    <div className="filter"></div>
                  </div>
                  <div className="card-title flex">
                    <p className="box-title">{card.title}</p>
                    <p className="date">{card.date}</p>
                  </div>
                </div>
              ))}
          <button
            className="new-btn"
            onClick={() => navigate("/builder/moment")}
          >
            + 모먼트 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
