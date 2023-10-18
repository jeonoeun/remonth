import React, { useEffect, useState } from "react";
import "./RemonthDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsFillShareFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";

export default function RemonthDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const remonthData = useSelector((state) => state.moments.remonths);
  const [matchedItem, setMatchedItem] = useState();
  useEffect(() => {
    setMatchedItem(remonthData.find((remonth) => remonth.id === id));
  }, [id, remonthData]);
  console.log(matchedItem);

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
              <p className="detail-review">{matchedItem.review.repeat(10)}</p>
              <div className="like-box">
                <span>좋아요 0</span>
                <span>댓글 0</span>
                <span>{matchedItem.month.slice(0, 7)}</span>
              </div>
            </div>
            <ul className="util-list flex">
              <li>
                <AiOutlineLike />
                <span>좋아요</span>
              </li>
              <li>
                <BiComment />
                <span>댓글</span>
              </li>
              <li>
                <AiOutlineShareAlt />
                <span>공유</span>
              </li>
            </ul>
          </div>
          <div className="content-body">
            <ul>
              <li>💘 올해의 드라마 : 작은아씨들</li>
              <li>💘 올해의 책 : 가녀장의 시대 </li>
              <li>💘 올해의 노래 : 모든 DAY6 음악 </li>
              <li>💘 올해의 술 : 잭다니엘 애플 </li>
              <li>💘 올해의 만취 모먼트 : 내일 봬요 누나</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
