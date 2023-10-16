import React, { useState } from "react";
import "./RemonthForm.scss";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { addNewRemonth } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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

export default function RemonthForm() {
  const [remonthData, setRemonthData] = useState({
    month: "",
  });
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const filteredKeys = Object.keys(remonthData).filter(
    (key) => !["month", "review", "title"].includes(key)
  );
  const remonthDataLength = filteredKeys.length;

  const handleSubmit = () => {
    setIsUploading(true);
    addNewRemonth(remonthData, currentUser) //
      .then(() => {
        setSuccess("등록되었습니다!");
        setTimeout(() => {
          setSuccess(null);
          navigate("/");
        }, 4000);
      })
      .finally(() => setIsUploading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRemonthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  return (
    <div className="remonth-form">
      <form className="form-ct">
        <div className="block">
          <p className="block-title">날짜 선택</p>
          <input
            type="month"
            onChange={(e) => {
              setRemonthData({
                month: e.target.value,
              });
            }}
          />
        </div>
        <div className="block">
          <p className="block-title">월간지 제목</p>
          <input
            type="text"
            id="title"
            placeholder="월간지 제목 추가"
            name="title"
            required
            className="input"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="block">
          <p className="block-title">설명</p>
          <input
            type="text"
            id="review"
            name="review"
            placeholder="월간지에 대한 간단한 설명을 작성해주세요"
            className="input"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      {remonthData.month && (
        <div className="select-area">
          <div className="block selected-num flex">
            <p>추가된 카드</p>
            <div className="flex">
              <div className="num">
                <strong>{remonthDataLength > 0 ? remonthDataLength : 0}</strong>{" "}
                개
              </div>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          {categroyList.map((list) => {
            const filteredItems = currentUser.cards
              .filter((item) => item.date.slice(0, 7) === remonthData.month)
              .filter((item) => item.category === list);

            if (filteredItems.length > 0) {
              return (
                <div className="block">
                  <p className="block-title">{list}</p>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={8}
                    className="mySwiper"
                  >
                    {filteredItems.map((card) => (
                      <SwiperSlide>
                        <div
                          className="card-item"
                          onClick={() =>
                            setRemonthData((prev) => ({
                              ...prev,
                              [card.category]: card,
                            }))
                          }
                        >
                          <div className="card-img">
                            <img src={card.image} alt="" />
                            {Object.values(remonthData).includes(card) && (
                              <div className="on flex">
                                <div className="flex">
                                  <BsFillCheckCircleFill />
                                  <span>추가됨</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <p>{card.title}</p>
                          <p>{card.date}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}

      <div className="btn-area">
        <button
          className="button"
          disabled={isUploading}
          onClick={handleSubmit}
        >
          {isUploading ? "업로드 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}
