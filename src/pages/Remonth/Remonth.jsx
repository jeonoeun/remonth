import React, { useEffect } from "react";
import "./Remonth.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getRemonthList } from "../../api/firebase";
import { setRemonths } from "../../store/moment";
import { setUserRemonths } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Remonth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser) || {};
  const remonthData = useSelector((state) => state.moments.remonths);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRemonthList();
        dispatch(setRemonths(data));
        currentUser.id &&
          dispatch(
            setUserRemonths(
              data.filter((card) => card.userId === currentUser.id)
            )
          );
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [dispatch, currentUser.id]);

  return (
    <div className="remonth">
      <div className="title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">remonth</p>
      </div>
      <div className="content">
        {remonthData.map((card) => (
          <div
            key={card.id}
            className="remonth-card"
            onClick={() => navigate(`/${card.id}`)}
          >
            <div className="img-ct">
              <img src={card.영상.image} alt="" className="card-img" />
            </div>
            <div className="card-info">
              <p>
                {card.month.slice(5, 7)}월호 | {card.title}
              </p>
              <div className="user flex">
                <img src={card.userImage} alt="" className="user-img" />
                <p>{card.userName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobileNavbar />
    </div>
  );
}
