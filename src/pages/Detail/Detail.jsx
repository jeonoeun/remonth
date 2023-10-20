import React, { useEffect, useState } from "react";
import "./Detail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moments = useSelector((state) => state.moments.moments);
  const [matchedItem, setMatchedItem] = useState();
  useEffect(() => {
    setMatchedItem(moments.find((moment) => moment.id === id));
  }, [id, moments]);

  return (
    <div className="detail">
      <div className="page-title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
      </div>
      {matchedItem && (
        <div className="content-ct">
          <img className="detail-img" src={matchedItem.image} alt="" />
          <div className="content">
            <ul className="title-box flex">
              <li className="detail-title">{matchedItem.title}</li>
              <li className="detail-info flex">
                {matchedItem.user && (
                  <div className="profile flex">
                    <img src={matchedItem.user.image} alt="userImage" />
                    <span className="user-name">{matchedItem.user.name}</span>
                  </div>
                )}
                <span>·</span>
                <span>{matchedItem.category}</span>
                <span>·</span>
                <span>{matchedItem.date}</span>
              </li>
              {/* <li className="like-box flex">
                <span>좋아요 0</span>
                <span>댓글 0</span>
              </li> */}
            </ul>
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
            <div className="box-list">
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
        </div>
      )}
      <MobileNavbar />
    </div>
  );
}
