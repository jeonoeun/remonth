import React, { useState } from "react";
import "./RemonthForm.scss";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { addNewRemonth } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="remonth-form">
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
      {categroyList.map((list) => {
        const filteredItems = currentUser.cards
          .filter((item) => item.date.slice(0, 7) === remonthData.month)
          .filter((item) => item.category === list);

        if (filteredItems.length > 0) {
          return (
            <div className="block">
              <p className="block-title flex">
                <span>{list}</span>
                <span>더보기</span>
              </p>
              <Swiper slidesPerView={3} spaceBetween={8} className="mySwiper">
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
