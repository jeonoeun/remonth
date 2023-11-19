import React from "react";
import "./MyMoment.scss";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment, BiSliderAlt } from "react-icons/bi";

export default function MyMoment({ currentUser }) {
  const navigate = useNavigate();
  const moments = useSelector((state) => state.moments.moments);
  const remonths = useSelector((state) => state.moments.remonths);
  const userMoment = moments.filter((card) => card.user.id === currentUser.id);
  const userRemonth = remonths.filter((card) => card.userId === currentUser.id);

  return (
    <div className="myMoment">
      <div className="page-title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">나의 모먼트</p>
      </div>
      <div className="content">
        <div className="user-area">
          <div className="user">
            <img src={currentUser.image} alt="" className="user-img" />
            <p className="name">{currentUser.name}</p>
            <p className="email">{currentUser.email}</p>
          </div>
          <div className="flex userCard-num">
            <div className="flex">
              <span className="num">{userMoment.length}</span>
              <span>모먼트</span>
            </div>
            <div className="flex">
              <span className="num">{userRemonth.length}</span>
              <span>월간지</span>
            </div>
            <div className="flex">
              <span className="num">187</span>
              <span>좋아요</span>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="block-title flex">
            <div>
              <span>모먼트</span>
              <span className="color-num">{userMoment.length}</span>
            </div>
            <button className="filter-btn flex">
              <BiSliderAlt />
            </button>
          </div>
          <div className="photo-grid">
            {userMoment.map((card) => (
              <div
                key={card.id}
                className="moment-card"
                onClick={() => navigate(`/moment/${card.id}`)}
              >
                <div className="moment-card-title flex">
                  <div className="user flex">
                    <img src={card.user.image} alt="" className="user-img" />
                    <div className="flex">
                      <p>{card.user.name}</p>
                      <p>{card.date}</p>
                    </div>
                  </div>
                  <button>
                    <BsThreeDotsVertical />
                  </button>
                </div>

                <div className="img-ct">
                  <img src={card.image} alt="" className="card-img" />
                </div>
                <div className="card-util flex">
                  <div className="flex">
                    <button>
                      <AiOutlineHeart />
                    </button>
                    <button>
                      <BiComment />
                    </button>
                  </div>
                  <span>0 likes</span>
                </div>
                <div className="card-info flex">
                  <p className="card-title">{card.title.repeat(3)}</p>
                  <p className="card-review">{card.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}
