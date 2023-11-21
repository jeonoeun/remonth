import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Remonth from "./pages/Remonth/Remonth";
import Moment from "./pages/Moment/Moment";
import MyPage from "./pages/MyPage/MyPage";
import RemonthDetail from "./pages/RemonthDetail/RemonthDetail";
import { getMomentList, getRemonthList, onUserChanged } from "./api/firebase";
import { setCurrentUser } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import MomentDetail from "./pages/MomentDetail/MomentDetail";
import Header from "./components/Header/Header";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [moments, setMoments] = useState();
  const [userMoments, setUserMoments] = useState();
  const [remonths, setRemonths] = useState();
  const [userRemonths, setUserRemonths] = useState();
  const currentUser = useSelector((state) => state.user.currentUser);

  const isMobile = useMediaQuery({ maxWidth: 728 });
  const isTablet = useMediaQuery({ minWidth: 729, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

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
      currentUser &&
        moments &&
        moments.filter((moment) => moment.user.id === currentUser.id)
    );
  }, [moments, currentUser]);

  useEffect(() => {
    setUserRemonths(
      currentUser &&
        remonths &&
        remonths.filter((remonth) => remonth.userData.id === currentUser.id)
    );
  }, [remonths, currentUser]);

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
      <ScrollToTop />
      {isMobile || <Header currentUser={currentUser} />}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Home userMoments={userMoments} />} />
          <Route path="/moment" element={<Moment moments={moments} />} />
          <Route
            path="/moment/:id"
            element={
              <MomentDetail moments={moments} currentUser={currentUser} />
            }
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
            path="/builder/moment"
            element={
              <Builder userMoments={userMoments} currentUser={currentUser} />
            }
          />
          <Route
            path="/builder/remonth"
            element={<Builder userMoments={userMoments} />}
          />
        </Routes>
      </div>
      {isDesktop || isTablet || pathname.includes("builder") || <MobileNavbar currentUser={currentUser} />}
    </div>
  );
}
