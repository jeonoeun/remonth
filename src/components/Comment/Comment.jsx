import React from "react";
import "./Comment.scss";
import { useParams } from "react-router-dom";
import { removeComment } from "../../api/firebase";

export default function Comment({
  currentUser,
  setIsCommentModal,
  comments,
  setShowLoginModal,
}) {
  const { id } = useParams();

  return (
    <div className="comment-area">
      <p className="comment-area-title">
        {comments && comments.length}개의 댓글
      </p>
      {comments && comments.length > 0 ? (
        <ul className="inner">
          {comments.map((list) => (
            <li key={list.commentId}>
              <div className="top flex">
                <div className="flex">
                  <img src={list.image} alt="" />
                  <div className="comment-user flex">
                    <span>{list.name}</span>
                    <span className="date">{list.date}</span>
                  </div>
                </div>
                {list.userId === currentUser.id && (
                  <div className="user-delete-btn flex">
                    <span onClick={() => removeComment(id, list)}>삭제</span>
                  </div>
                )}
              </div>
              <p className="user-comment">{list.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="none-comments"
          onClick={() => {
            if (currentUser && currentUser.id) {
              setIsCommentModal(true);
            } else {
              setShowLoginModal(true);
            }
          }}
        >
          아직 댓글이 없어요. <br /> 첫번째 댓글을 달아보시겠어요?
        </div>
      )}
    </div>
  );
}
