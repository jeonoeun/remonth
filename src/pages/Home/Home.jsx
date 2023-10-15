import React, { useEffect } from "react";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getMomentList } from "../../api/firebase";
import { setMoments } from "../../store/moment";
import { setUserCards } from "../../store/user";

export default function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser) || {};

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
      </div>
      <MobileNavbar />
    </div>
  );
}
