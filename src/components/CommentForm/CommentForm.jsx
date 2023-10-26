import React, { useState } from "react";
import "./CommentForm.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { addComment } from "../../api/firebase";
import { useParams } from "react-router-dom";

export default function CommentForm({ setIsCommentModal, setSuccess }) {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { name, image } = currentUser;
  const [comment, setComment] = useState({
    name,
    image,
    userId: currentUser.id,
    text: "",
    date: moment().format("YYYY-MM-DD"),
  });

  const handleComment = () => {
    addComment(id, comment); //
    setIsCommentModal(false);
    setSuccess("댓글이 등록되었습니다!");
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  };

  return (
    <div className="comment-form">
      <div className="comment-form-title flex">
        <button onClick={() => setIsCommentModal(false)}>
          <AiOutlineClose />
        </button>
        <button onClick={handleComment}>저장</button>
      </div>
      <div className="content">
        <input
          type="text"
          required
          placeholder="댓글을 작성해주세요."
          onChange={(e) =>
            setComment((prev) => ({ ...prev, text: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
