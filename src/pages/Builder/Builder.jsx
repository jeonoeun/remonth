import React, { useState } from "react";
import "./Builder.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addNewMoment } from "../../api/firebase";
import { uploadImage } from "../../api/uploader";
import { HiPhotograph } from "react-icons/hi";
import { setCardDetail } from "../../store/card";

const categroyList = [
  "노래",
  "책",
  "영상",
  "음식",
  "소비",
  "공간",
  "운동",
  "순간",
];

export default function Builder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardDate = useSelector((state) => state.card.card);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [card, setCard] = useState({
    tags: [],
  });
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    file
      ? uploadImage(file)
          .then((url) => {
            addNewMoment(card, url, currentUser, cardDate.date) //
              .then(() => {
                setSuccess("등록되었습니다!");
                setTimeout(() => {
                  setSuccess(null);
                }, 4000);
              });
          })
          .finally(() => setIsUploading(false))
      : addNewMoment(card, currentUser)
          .then(() => {
            setSuccess("등록되었습니다!");
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          })
          .finally(() => setIsUploading(false));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files.length > 0) {
      setFile(files[0]);
      return;
    }
    setCard((card) => ({ ...card, [name]: value }));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      const newTag = event.target.value;
      setCard((card) => ({
        ...card,
        tags: [...card.tags, newTag],
      }));
      event.target.value = "";
    }
  };

  return (
    <div className="builder">
      <Header />
      <div className="builder-ct">
        <div className="flex builder-title">
          <button onClick={() => navigate(-1)}>
            <MdKeyboardArrowLeft />
          </button>
          <p className="title">등록하기</p>
        </div>
        <form className="form-area" onSubmit={handleSubmit}>
          <div className="block cate">
            <p className="block-title">카테고리 선택</p>
            <ul className="builder-category-list flex">
              {categroyList.map((list) => (
                <li
                  key={list}
                  onClick={() =>
                    setCard((card) => ({ ...card, category: list }))
                  }
                  className={card.category === list ? "on" : null}
                >
                  {list}
                </li>
              ))}
            </ul>
          </div>
          <div className="block">
            <p className="block-title">날짜 선택</p>
            <input
              type="date"
              defaultValue={cardDate.date}
              onChange={(e) => {
                dispatch(
                  setCardDetail({
                    date: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="block">
            <p className="block-title">사진 선택</p>
            <div className="card-img">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="local file" />
              ) : (
                <div className="none-file flex">
                  <HiPhotograph />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              name="file"
              multiple
              required
              onChange={handleChange}
            />
          </div>
          <div className="block">
            <p className="block-title">제목</p>
            <input
              type="text"
              id="title"
              placeholder="제목 추가"
              name="title"
              required
              className="input"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="block">
            <p className="block-title">리뷰/메모</p>
            <input
              type="text"
              id="review"
              name="review"
              placeholder="리뷰 또는 추가로 입력할 내용을 작성해주세요"
              className="input"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="block keyword">
            <p className="block-title">태그</p>
            <div className="tag-info">
              <span>- 엔터를 입력하여 태그를 등록 할 수 있습니다.</span>
            </div>
            <div className="tag-wrapper">
              <div className="hashTags">
                {card.tags &&
                  card.tags.map((tag) => (
                    <div className="tag">
                      <span>{tag}</span>
                    </div>
                  ))}
                <input
                  type="text"
                  placeholder="태그를 입력하세요"
                  onKeyUp={handleKeyUp}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
          <div className="btn-area">
            <button
              className="button"
              disabled={isUploading}
              onClick={handleSubmit}
            >
              {isUploading ? "업로드 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
