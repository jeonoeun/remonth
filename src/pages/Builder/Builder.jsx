import React, { useState } from "react";
import "./Builder.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMoment } from "../../api/firebase";
import { uploadImage } from "../../api/uploader";
import { HiPhotograph } from "react-icons/hi";
import { setCardDetail } from "../../store/card";
import RemonthForm from "../../components/RemonthForm/RemonthForm";
import PageHeader from "../../components/PageHeader/PageHeader";
import categoryList from "../../data";

export default function Builder({ userMoments, currentUser, setSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardDate = useSelector((state) => state.card.card);
  const [card, setCard] = useState({
    category: "노래",
    title: "",
    review: "",
    tags: [],
  });
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewMoment(card, url, currentUser, cardDate.date) //
          .then(() => {
            setCard(() => ({
              category: "노래",
              title: "",
              review: "",
              tags: [],
            }));
            setFile(null);
            setSuccess("모먼트가 등록되었습니다!");
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          });
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
      <PageHeader title={"모먼트 / 월간지 등록하기"} />
      <ul className="location-btn flex">
        <li
          className={location.pathname === "/builder/moment" ? "on" : null}
          onClick={() => navigate("/builder/moment")}
        >
          모먼트
        </li>
        <li
          className={location.pathname === "/builder/remonth" ? "on" : null}
          onClick={() => navigate("/builder/remonth")}
        >
          월간지
        </li>
      </ul>
      {location.pathname === "/builder/moment" ? (
        <form className="form-area" action="" onSubmit={handleSubmit}>
          <div className="block cate">
            <p className="block-title">카테고리 선택</p>
            <ul className="builder-category-list flex">
              {categoryList.map((list) => (
                <li
                  key={list.type}
                  onClick={() =>
                    setCard((card) => ({ ...card, category: list.type }))
                  }
                  className={card.category === list.type ? "on" : null}
                >
                  {list.type}
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
              placeholder="제목 추가"
              name="title"
              value={card.title}
              required
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="input"
            />
          </div>
          <div className="block">
            <p className="block-title">리뷰/메모</p>
            <input
              type="text"
              placeholder="리뷰 또는 추가로 입력할 내용을 작성해주세요"
              name="review"
              value={card.review}
              required
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="input"
            />
          </div>
          <div className="block keyword">
            <p className="block-title">태그</p>
            <div className="tag-wrapper">
              <div className="hashTags">
                {card.tags &&
                  card.tags.map((tag) => (
                    <div key={tag} className="tag">
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
            <div className="tag-info">
              <span>엔터를 입력하여 태그를 등록 할 수 있습니다.</span>
            </div>
          </div>
          <div className="btn-area">
            <button className="button" type="submit" disabled={isUploading}>
              {isUploading ? "업로드 중..." : "등록하기"}
            </button>
          </div>
        </form>
      ) : (
        <RemonthForm userMoments={userMoments} setSuccess={setSuccess} />
      )}
    </div>
  );
}
