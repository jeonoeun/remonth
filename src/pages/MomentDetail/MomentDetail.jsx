import React, { useEffect, useState } from "react";
import "./MomentDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { FaShareAlt, FaComment } from "react-icons/fa";
import {
  addLikeUser,
  getComments,
  getLikeUsers,
  removeLikeUser,
  removeMoment,
} from "../../api/firebase";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm";
import PageHeader from "../../components/PageHeader/PageHeader";
import { IoMdSettings } from "react-icons/io";
import LoginModal from "../../components/LoginModal/LoginModal";

export default function MomentDetail({ moments, currentUser, setSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matchedItem, setMatchedItem] = useState();
  const [likeUsers, setLikeUsers] = useState();
  const [comments, setComments] = useState();
  const [isModal, setIsModal] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRemove = () => {
    removeMoment(id); //
    navigate("/moment");
    setSuccess("게시글이 삭제되었습니다");
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  useEffect(() => {
    const found = moments && moments.find((moment) => moment.id === id);
    found ? setMatchedItem(found) : navigate("/notFound");
  }, [id, moments, navigate]);

  useEffect(() => {
    getLikeUsers(id, (data) => {
      setLikeUsers(data);
    });
  }, [id]);

  useEffect(() => {
    getComments(id, (data) => {
      setComments(data);
    });
  }, [id]);

  return (
    matchedItem && (
      <div className="detail">
        <PageHeader
          matchedItem={matchedItem}
          isModal={isModal}
          setIsModal={setIsModal}
        />
        {currentUser &&
          matchedItem &&
          matchedItem.user.id === currentUser.id && (
            <button className="user-btn" onClick={() => setIsModal(!isModal)}>
              <IoMdSettings />
            </button>
          )}

        {isModal && (
          <div className="background">
            <ul className="user-modal">
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
                  <span className="bar"></span>
                  <span>
                    {matchedItem.date} 의 {matchedItem.category}
                  </span>
                </li>
                <li className="flex like-box">
                  <span>
                    좋아요 <strong>{likeUsers && likeUsers.length}</strong>
                  </span>
                  <span>
                    댓글 <strong>{comments && comments.length}</strong>
                  </span>
                </li>
              </ul>
              <ul className="util-list flex">
                <li
                  onClick={() => {
                    if (currentUser && currentUser.id) {
                      if (likeUsers && likeUsers.includes(currentUser.id)) {
                        removeLikeUser(id, currentUser.id);
                      } else {
                        addLikeUser(id, currentUser.id);
                      }
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className={
                    currentUser &&
                    likeUsers &&
                    likeUsers.includes(currentUser.id)
                      ? "on"
                      : ""
                  }
                >
                  <HiThumbUp />
                  <span>좋아요</span>
                </li>
                <li
                  onClick={() => {
                    if (currentUser && currentUser.id) {
                      setIsCommentModal(!isCommentModal);
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                >
                  <FaComment />
                  <span>댓글</span>
                </li>
                <li>
                  <FaShareAlt />
                  <span>공유</span>
                </li>
              </ul>
              <div className="box-list">
                <div className="review block">
                  <p className="block-title">리뷰/메모</p>
                  <p className="review-content">{matchedItem.review}</p>
                </div>
                {matchedItem.tags.length !== 0 && (
                  <div className="tags block">
                    <p className="block-title">태그</p>
                    <ul className="tag-box flex">
                      {matchedItem.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Comment
              currentUser={currentUser}
              comments={comments}
              setIsCommentModal={setIsCommentModal}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
        )}
        {isCommentModal && (
          <CommentForm
            setIsCommentModal={setIsCommentModal}
            setSuccess={setSuccess}
          />
        )}
        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      </div>
    )
  );
}
