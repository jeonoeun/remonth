import React, { useEffect, useState } from "react";
import "./Detail.scss";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";

export default function Detail() {
  const { id } = useParams();
  const moments = useSelector((state) => state.moments.moments);
  const [matchedItem, setMatchedItem] = useState();
  useEffect(() => {
    setMatchedItem(moments.find((moment) => moment.id === id));
  }, [id, moments]);

  return (
    <div className="detail">
      <Header />
      {matchedItem && (
        <div className="content">
          <img className="detail-img" src={matchedItem.image} alt="" />
          <div className="content">
            <div className="title-box">
              <div className="spot-name flex">
                <BiSolidMap />
                <span className="name">{matchedItem.category}</span>
              </div>
              <p className="detail-title">{matchedItem.title}</p>
              {matchedItem.user && (
                <div className="user-area flex">
                  <div className="profile flex">
                    <img src={matchedItem.user.image} alt="userImage" />
                    <div className="flex">
                      <span className="user-name">{matchedItem.user.name}</span>
                      <span className="date">{matchedItem.date}</span>
                    </div>
                  </div>
                  <div className="util-box flex">
                    <button className="flex">
                      <AiOutlineHeart />
                    </button>
                    <button className="flex">
                      <FaShareAlt />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="review block">
              <p className="title">리뷰/메모</p>
              <p className="review-content">{matchedItem.review}</p>
            </div>
            {matchedItem.tags && (
              <div className="tags block">
                <p className="title">태그</p>
                <ul className="tag-box flex">
                  {matchedItem.tags.map((tag) => (
                    <li className="tag">{tag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
