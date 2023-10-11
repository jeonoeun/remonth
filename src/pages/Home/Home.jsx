import React, { useEffect, useState } from "react";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getMomentList } from "../../api/firebase";
import { setMoments } from "../../store/moment";

export default function Home() {
  const dispatch = useDispatch();
  const moments = useSelector((state) => state.moments.moments);
  // const currentUser = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMomentList();
        dispatch(setMoments(data));

        // currentUser.id &&
        //   data.forEach((item) => {
        //     if (item.user.id === currentUser.id) {
        //       setUserData((card) => [...card, item]);
        //     }
        //   });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className="home">
      <Header />
      <div className="content">
        <Calendar moments={moments} />
        {/* <CategoryList /> */}
      </div>
      <MobileNavbar />
    </div>
  );
}
