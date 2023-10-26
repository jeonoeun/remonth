import React, { useEffect, useState } from "react";
import "./RemonthDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const categroyList = {
  노래: "music",
  책: "book",
  영상: "video",
  음식: "food",
  소비: "item",
  공간: "place",
  운동: "workout",
  순간: "moment",
};

export default function RemonthDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const remonthData = useSelector((state) => state.moments.remonths);
  const [matchedItem, setMatchedItem] = useState();
  useEffect(() => {
    setMatchedItem(remonthData.find((remonth) => remonth.id === id));
  }, [id, remonthData]);

  return (
    <div className="remonth-detail">
      <div className="page-title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
      </div>
      {matchedItem && (
        <div className="content">
          <div className="content-header">
            <div className="img-ct flex">
              {matchedItem.selectedCards
                .filter((_, i) => i < 4)
                .map((e) => (
                  <div className="image">
                    <img src={e.image} alt="" />
                  </div>
                ))}
              <div className="filter"></div>
              <div className="user flex">
                <div className="flex">
                  <img
                    src={matchedItem.userImage}
                    alt=""
                    className="user-img"
                  />
                  <p>{matchedItem.userName}</p>
                </div>
              </div>
            </div>
            <div className="detail-info">
              <p className="detail-title">{matchedItem.title}</p>
              <p className="detail-review">{matchedItem.review}</p>
              <div className="like-box">
                <span>{matchedItem.month.slice(0, 7)}월호</span>
              </div>
            </div>
            <ul className="util-list flex">
              <li>
                <AiOutlineLike />
                <span>좋아요 0</span>
              </li>
              <li>
                <BiComment />
                <span>댓글 0</span>
              </li>
              <li>
                <AiOutlineShareAlt />
                <span>공유</span>
              </li>
            </ul>
          </div>
          <div className="content-body">
            {/* <div className="preview-list">
              <p className="preview-title">미리보기</p>
              <ul>
                {matchedItem.selectedCards.map((item) => (
                  <li>
                    💘{" "}
                    <strong>
                      {matchedItem.month.slice(-2)}월의 {item.category} :
                    </strong>{" "}
                    {item.title}
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="card-area">
              {matchedItem.selectedCards.map((card) => (
                <div className="category-card">
                  <span className="category-name">
                    {categroyList[card.category]}
                  </span>
                  <ul className="title-area">
                    <li className="title">{card.title}</li>
                    <li>✦✦✦✦✧</li>
                    <li>{card.date}</li>
                    <li className="flex">
                      <p>
                        {matchedItem.month.slice(-2)}월의 {card.category}
                      </p>
                      {card.tags && (
                        <div className="tags flex">
                          {card.tags.map((tag) => (
                            <span>/ {tag}</span>
                          ))}
                        </div>
                      )}
                    </li>
                  </ul>
                  <img
                    src={card.image}
                    alt=""
                    onClick={() => navigate(`/moment/${card.id}`)}
                  />
                  <p className="review">{card.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <MobileNavbar />
    </div>
  );
}
