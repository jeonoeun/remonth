import React, { useEffect, useState } from "react";
import "./MomentDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { HiThumbUp } from "react-icons/hi";
import { BiSolidPencil } from "react-icons/bi";
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

export default function MomentDetail({ moments, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matchedItem, setMatchedItem] = useState();
  const [likeUsers, setLikeUsers] = useState();
  const [comments, setComments] = useState();
  const [success, setSuccess] = useState();

  const [isModal, setIsModal] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);

  const handleRemove = () => {
    removeMoment(id); //
    navigate("/moment");
  };

  useEffect(() => {
    moments && setMatchedItem(moments.find((moment) => moment.id === id));
  }, [id, moments]);

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
    <div className="detail">
      <PageHeader
        matchedItem={matchedItem}
        isModal={isModal}
        setIsModal={setIsModal}
        currentUser={currentUser}
      />
      {isModal && (
        <div className="background">
          <ul className="user-modal">
            <li>
              <span>수정하기</span>
              <span>
                <BiSolidPencil />
              </span>
            </li>
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
                <span>·</span>
                <span>{matchedItem.date}</span>
                <span>·</span>
                <span>{matchedItem.category}</span>
              </li>
              <li className="flex like-box">
                <span>좋아요 {likeUsers && likeUsers.length}</span>
                <span>댓글 {comments && comments.length}</span>
              </li>
            </ul>
            <ul className="util-list flex">
              <li
                onClick={() => {
                  likeUsers && likeUsers.includes(currentUser.id)
                    ? removeLikeUser(id, currentUser.id)
                    : addLikeUser(id, currentUser.id);
                }}
                className={
                  likeUsers && likeUsers.includes(currentUser.id) ? "on" : ""
                }
              >
                <HiThumbUp />
                <span>좋아요</span>
              </li>
              <li onClick={() => setIsCommentModal(!isCommentModal)}>
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
                  <p className="block-title">태그 {matchedItem.tags.length}</p>
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
          />
        </div>
      )}

      {isCommentModal && (
        <CommentForm
          setIsCommentModal={setIsCommentModal}
          setSuccess={setSuccess}
        />
      )}

      {success && <div className="success-box">{success}</div>}

      <MobileNavbar />
    </div>
  );
}
