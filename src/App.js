import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Remonth from "./pages/Remonth/Remonth";
import Moment from "./pages/Moment/Moment";
import MyPage from "./pages/MyPage/MyPage";
import RemonthDetail from "./pages/RemonthDetail/RemonthDetail";
import MyMoment from "./pages/MyMoment/MyMoment";
import { getMomentList, getRemonthList, onUserChanged } from "./api/firebase";
import { setCurrentUser } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import MomentDetail from "./pages/MomentDetail/MomentDetail";

export default function App() {
  const dispatch = useDispatch();
  const [moments, setMoments] = useState();
  const [userMoments, setUserMoments] = useState();
  const [remonths, setRemonths] = useState();
  const [userRemonths, setUserRemonths] = useState();
  const currentUser = useSelector((state) => state.user.currentUser) || {};

  useEffect(() => {
    try {
      getMomentList((moments) => {
        setMoments(moments);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    try {
      getRemonthList((data) => {
        setRemonths(data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    setUserMoments(
      moments && moments.filter((moment) => moment.user.id === currentUser.id)
    );
  }, [currentUser.id, moments]);

  useEffect(() => {
    setUserRemonths(
      remonths &&
        remonths.filter((remonth) => remonth.userData.id === currentUser.id)
    );
  }, [currentUser.id, remonths]);

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          setCurrentUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
            email: userAuth.email,
          })
        );
    });
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home userMoments={userMoments} />} />
        <Route path="/moment" element={<Moment moments={moments} />} />
        <Route
          path="/moment/:id"
          element={<MomentDetail moments={moments} currentUser={currentUser} />}
        />
        <Route path="/remonth" element={<Remonth remonths={remonths} />} />
        <Route
          path="/remonth/:id"
          element={
            <RemonthDetail remonths={remonths} currentUser={currentUser} />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              userMoments={userMoments}
              userRemonths={userRemonths}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/mypage/moment"
          element={<MyMoment currentUser={currentUser} />}
        />
        <Route
          path="/builder/moment"
          element={
            <Builder userMoments={userMoments} currentUser={currentUser} />
          }
        />
        <Route path="/builder/remonth" element={<Builder />} />
      </Routes>
    </div>
  );
}
