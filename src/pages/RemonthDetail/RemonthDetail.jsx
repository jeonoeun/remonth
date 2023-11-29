import React, { useEffect, useState } from "react";
import "./RemonthDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  addRemonthLikeUser,
  getRemonthLikeUsers,
  removeRemonth,
  removeRemonthLikeUser,
  removeUserLikes,
  setUserLikes,
} from "../../api/firebase";
import { IoMdSettings } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import LoginModal from "../../components/LoginModal/LoginModal";

export default function RemonthDetail({ remonths, currentUser, setSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matchedItem, setMatchedItem] = useState();
  const [likeUsers, setLikeUsers] = useState();
  const [isModal, setIsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    remonths && setMatchedItem(remonths.find((remonth) => remonth.id === id));
  }, [id, remonths]);

  useEffect(() => {
    getRemonthLikeUsers(id, (data) => {
      setLikeUsers(data);
    });
  }, [id]);

  const handleRemove = () => {
    removeRemonth(id); //
    navigate("/remonth");
    setSuccess("게시글이 삭제되었습니다");
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleLikeUsers = () => {
    if (currentUser && currentUser.id) {
      if (likeUsers && likeUsers.includes(currentUser.id)) {
        removeRemonthLikeUser(id, currentUser.id);
        removeUserLikes(matchedItem, currentUser.id, "remonth");
      } else {
        addRemonthLikeUser(id, currentUser.id);
        setUserLikes(matchedItem, currentUser.id, "remonth");
      }
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="remonth-detail">
      <PageHeader
        matchedItem={matchedItem}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      {currentUser &&
        matchedItem &&
        matchedItem.userData.id === currentUser.id && (
          <button className="user-btn" onClick={() => setIsModal(!isModal)}>
            <IoMdSettings />
          </button>
        )}
      {isModal && (
        <div className="background" onClick={() => setIsModal(false)}>
          <ul className="user-modal" onClick={(e) => e.stopPropagation()}>
            <li onClick={handleRemove}>
              <span>삭제하기</span>
              <span>
                <AiFillDelete />
              </span>
            </li>
            <li className="close" onClick={() => setIsModal(!isModal)}>
              취소
            </li>
          </ul>
        </div>
      )}
      {matchedItem && (
        <div className="content">
          <div className="content-header">
            <div className="img-ct flex">
              {matchedItem.selectedCards
                .filter((_, i) => i < 4)
                .map((e) => (
                  <div key={e.image} className="image">
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
              <div className="detail-util flex">
                <span>
                  좋아요 <strong>{likeUsers && likeUsers.length}</strong>
                </span>
                <span className="bar"></span>
                <span>
                  <strong className="flex">
                    <span>{matchedItem.month.slice(0, 4)}년</span>
                    <span>{matchedItem.month.slice(-2)} 월호</span>
                  </strong>
                </span>
              </div>
            </div>
            <ul className="util-list flex">
              <li
                onClick={handleLikeUsers}
                className={
                  currentUser && likeUsers && likeUsers.includes(currentUser.id)
                    ? "on"
                    : ""
                }
              >
                <HiThumbUp />
                <span>좋아요</span>
              </li>
            </ul>
          </div>
          <div className="content-body">
            <div className="card-area">
              {matchedItem.selectedCards.map((card) => (
                <div key={card.id} className="category-card">
                  <span className="category-name">{card.category}</span>
                  <ul className="title-area">
                    <li className="title-title">{card.title}</li>
                    <li className="title-date">{card.date}</li>
                    <li className="flex">
                      {card.tags && (
                        <div className="tags flex">
                          {card.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
    </div>
  );
}
