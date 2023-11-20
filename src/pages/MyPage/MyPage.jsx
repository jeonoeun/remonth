import "./MyPage.scss";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { logout } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user";
import { AiFillSetting } from "react-icons/ai";

export default function MyPage({ userMoments, userRemonths, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  return (
    <div className="myPage">
      <PageHeader title={"마이페이지"} />
      <button className="user-btn" onClick={handleLogout}>
        <AiFillSetting />
      </button>
      <div className="content">
        <div className="user-area">
          <div className="user">
            <img src={currentUser.image} alt="" className="user-img" />
            <p className="name">{currentUser.name}</p>
            <p className="email">{currentUser.email}</p>
          </div>
          <div className="flex userCard-num">
            <div className="flex">
              <span className="num">{userMoments && userMoments.length}</span>
              <span>모먼트</span>
            </div>
            <div className="flex">
              <span className="num">{userRemonths && userRemonths.length}</span>
              <span>월간지</span>
            </div>
            <div className="flex">
              <span className="num">0</span>
              <span>좋아요</span>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="block-title">
            <span>모먼트</span>
            <span className="color-num">
              {userMoments && userMoments.length}
            </span>
          </div>
          <Swiper slidesPerView={3} spaceBetween={8} className="mySwiper">
            {userMoments &&
              userMoments.map((card) => (
                <SwiperSlide>
                  <div
                    className="card-item"
                    onClick={() => navigate(`/moment/${card.id}`)}
                  >
                    <img src={card.image} alt="" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            className="builder-btn"
            onClick={() => navigate("/builder/moment")}
          >
            + 모먼트 등록하기
          </button>
        </div>
        <div className="block">
          <div className="block-title">
            <span>월간지</span>
            <span className="color-num">
              {userRemonths && userRemonths.length}
            </span>
          </div>
          <Swiper slidesPerView={3} spaceBetween={8} className="mySwiper">
            {userRemonths &&
              userRemonths.map((card) => (
                <SwiperSlide>
                  <div
                    className="card-item"
                    onClick={() => navigate(`/remonth/${card.id}`)}
                  >
                    <img src={card.selectedCards[0].image} alt="" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            className="builder-btn"
            onClick={() => navigate("/builder/remonth")}
          >
            + 월간지 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
