import React, { useEffect, useState } from "react";
import "./RemonthDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import { FaShareAlt, FaComment } from "react-icons/fa";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  addRemonthLikeUser,
  getRemonthLikeUsers,
  removeRemonthLikeUser,
} from "../../api/firebase";
import { useSelector } from "react-redux";

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

export default function RemonthDetail({ remonths, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matchedItem, setMatchedItem] = useState();
  const [likeUsers, setLikeUsers] = useState();

  useEffect(() => {
    remonths && setMatchedItem(remonths.find((remonth) => remonth.id === id));
  }, [id, remonths]);

  useEffect(() => {
    getRemonthLikeUsers(id, (data) => {
      setLikeUsers(data);
    });
  }, [id]);

  return (
    <div className="remonth-detail">
      <PageHeader />
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
                    src={matchedItem.userData.image}
                    alt=""
                    className="user-img"
                  />
                  <p>{matchedItem.userData.name}</p>
                </div>
              </div>
            </div>
            <div className="detail-info">
              <p className="detail-title">{matchedItem.title}</p>
              <p className="detail-review">{matchedItem.review}</p>
              <div className="detail-util">
                <span>좋아요 4384</span>
                <span>댓글 463</span>
                <span>3년 전 업데이트</span>
              </div>
            </div>
            <ul className="util-list flex">
              <li
                onClick={() => {
                  likeUsers && likeUsers.includes(currentUser.id)
                    ? removeRemonthLikeUser(id, currentUser.id)
                    : addRemonthLikeUser(id, currentUser.id);
                }}
                className={
                  likeUsers && likeUsers.includes(currentUser.id) ? "on" : ""
                }
              >
                <HiThumbUp />
                <span>좋아요</span>
              </li>
              <li>
                <FaComment />
                <span>댓글</span>
              </li>
              <li>
                <FaShareAlt />
                <span>공유</span>
              </li>
            </ul>
          </div>
          <div className="content-body">
            <div className="card-area">
              {matchedItem.selectedCards.map((card) => (
                <div className="category-card">
                  <span className="category-name">
                    {categroyList[card.category]}
                  </span>
                  <ul className="title-area">
                    <li className="title-title">{card.title}</li>
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
