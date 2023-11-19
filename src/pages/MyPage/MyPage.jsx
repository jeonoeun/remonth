import "./MyPage.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function MyPage({ userMoments, userRemonths, currentUser }) {
  const navigate = useNavigate();

  return (
    <div className="myPage">
      <PageHeader title={"마이페이지"} />
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
              <span className="num">187</span>
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
          <div className="photo-grid">
            {userMoments &&
              userMoments
                .filter((_, i) => i < 3)
                .map((card) => (
                  <div
                    className="photo"
                    onClick={() => navigate(`/moment/${card.id}`)}
                  >
                    <img src={card.image} alt="" />
                  </div>
                ))}
          </div>
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
          <div className="photo-grid">
            {userRemonths &&
              userRemonths
                .filter((_, i) => i < 3)
                .map((card) => (
                  <div
                    className="photo"
                    onClick={() => navigate(`/remonth/${card.id}`)}
                  >
                    <img src={card.selectedCards[0].image} alt="" />
                  </div>
                ))}
          </div>
          <button
            className="builder-btn"
            onClick={() => navigate("/builder/remonth")}
          >
            + 월간지 등록하기
          </button>
        </div>
        <div className="block">
          <p>좋아요</p>
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}
