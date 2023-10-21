import "./MyPage.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const moments = useSelector((state) => state.moments.moments);
  const remonths = useSelector((state) => state.moments.remonths);
  const userMoment = moments.filter((card) => card.user.id === currentUser.id);
  const userRemonth = remonths.filter((card) => card.userId === currentUser.id);

  return (
    <div className="myPage">
      <div className="title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">마이페이지</p>
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
            <button onClick={() => navigate("/mypage/moment")}>더보기</button>
          </div>
          <div className="photo-grid">
            {userMoment
              .filter((_, i) => i < 3)
              .map((card) => (
                <div className="photo" onClick={() => navigate(`/moment/${card.id}`)}>
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
          <div className="block-title flex">
            <div>
              <span>월간지</span>
              <span className="color-num">{userRemonth.length}</span>
            </div>
            <button>더보기</button>
          </div>
          <div className="photo-grid">
            {userRemonth
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
