import React, { useEffect, useState } from "react";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getMomentList } from "../../api/firebase";
import { setMoments } from "../../store/moment";
import { setUserCards } from "../../store/user";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
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

export default function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser) || {};
  const [today, setToday] = useState();
  const [selectedTag, setSelectedTag] = useState("노래");
  const navigate = useNavigate();

  useEffect(() => {
    function getToday() {
      const date = new Date();
      const month = 1 + date.getMonth();
      setToday(month);
    }

    getToday();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMomentList();
        dispatch(setMoments(data));
        currentUser.id &&
          dispatch(
            setUserCards(data.filter((card) => card.user.id === currentUser.id))
          );
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [dispatch, currentUser.id]);

  return (
    <div className="home">
      <Header />
      <div className="content">
        <Calendar />
        <div className="moment-box">
          <div className="title-area flex">
            <div>
              <p className="box-title">{today}월의 모먼트</p>
              <p>
                총{" "}
                {currentUser.cards &&
                  currentUser.cards.filter(
                    (item) => item.category === selectedTag
                  ).length}
                개의 {selectedTag} 모먼트가 있어요
              </p>
            </div>
            <button>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="category-ct flex">
            <ul className="list-ct flex">
              {categroyList.map((item) => (
                <li
                  className={item === selectedTag && "on"}
                  key={item}
                  onClick={() => setSelectedTag(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {currentUser.cards &&
            currentUser.cards
              .filter((item) => item.category === selectedTag)
              .map((card) => (
                <div
                  className="card-item"
                  onClick={() => navigate(`/${card.id}`)}
                >
                  <div className="img-ct">
                    <img src={card.image} alt="" />
                    <div className="filter"></div>
                  </div>
                  <div className="card-title flex">
                    <p className="title">{card.title}</p>
                    <p className="date">{card.date}</p>
                  </div>
                </div>
              ))}
          <button
            className="new-btn"
            onClick={() => navigate("/builder/moment")}
          >
            + 모먼트 추가하기
          </button>
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}
