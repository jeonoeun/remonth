import React, { useState } from "react";
import "./RemonthForm.scss";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { addNewRemonth } from "../../api/firebase";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import categoryList from "../../data";

export default function RemonthForm({ userMoments, setSuccess }) {
  const [remonthData, setRemonthData] = useState({
    month: "",
    title: "",
    review: "",
    selectedCards: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = () => {
    setIsUploading(true);
    addNewRemonth(remonthData, currentUser) //
      .then(() => {
        setRemonthData(() => ({
          month: "",
          title: "",
          review: "",
          selectedCards: [],
        }));
        setSuccess("월간지가 등록되었습니다!");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
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
            value={remonthData.month}
            onChange={(e) => {
              setRemonthData((prev) => ({
                ...prev,
                month: e.target.value,
              }));
            }}
          />
        </div>
        <div className="block">
          <p className="block-title">월간지 제목</p>
          <input
            type="text"
            name="title"
            value={remonthData.title}
            placeholder="월간지 제목 추가"
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
            name="review"
            value={remonthData.review}
            placeholder="월간지에 대한 간단한 설명을 작성해주세요"
            className="input"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      {remonthData.month && (
        <div className="select-area">
          <div className="selected-num flex">
            <p>추가된 카드</p>
            <div className="flex">
              <div className="num">
                <strong>
                  {Object.keys(remonthData.selectedCards).length}{" "}
                </strong>
                개
              </div>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          {categoryList.map((list) => {
            const filteredItems = userMoments
              .filter((item) => item.date.slice(0, 7) === remonthData.month)
              .filter((item) => item.category === list.type);

            if (filteredItems.length !== 0) {
              return (
                <div key={list.type} className="block">
                  <p className="block-title">{list.type}</p>
                  <Swiper
                    slidesPerView={3}
                    slidesPerGroup={3}
                    spaceBetween={8}
                    className="mySwiper"
                  >
                    {filteredItems.map((card) => (
                      <SwiperSlide key={card.id}>
                        <div
                          className="card-item"
                          onClick={() => {
                            setRemonthData((prev) => {
                              const { selectedCards } = prev;
                              const cardCategory = card.category;

                              // // 이미 선택한 카테고리와 같은 객체가 있는지 확인
                              const existingIndex = selectedCards.findIndex(
                                (item) => item.category === cardCategory
                              );

                              if (existingIndex !== -1) {
                                // 이미 선택한 카테고리와 같은 객체가 있다면 해당 객체를 삭제하고 새로운 객체로 대체
                                selectedCards.splice(existingIndex, 1);
                              }

                              // 새로운 객체를 추가
                              return {
                                ...prev,
                                selectedCards: [...selectedCards, card],
                              };
                            });
                          }}
                        >
                          <div className="card-img">
                            <div className="img-ct">
                              <img src={card.image} alt="" />
                              {remonthData.selectedCards.includes(card) && (
                                <div className="on flex">
                                  <div className="flex">
                                    <BsFillCheckCircleFill />
                                    <span>추가됨</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="card-item-name">{card.title}</p>
                          <p className="card-item-date">{card.date}</p>
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
