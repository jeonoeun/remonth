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
import { addNewUser, setCurrentUser } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import MomentDetail from "./pages/MomentDetail/MomentDetail";
import Header from "./components/Header/Header";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "./ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Success from "./components/Success/Success";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const [allMoments, setAllMoments] = useState();
  const [userMoments, setUserMoments] = useState();
  const [allRemonths, setAllRemonths] = useState();
  const [userRemonths, setUserRemonths] = useState();
  const isMobile = useMediaQuery({ maxWidth: 728 });
  const isTablet = useMediaQuery({ minWidth: 729, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    setLoading(true);
    try {
      getMomentList((moments) => {
        setAllMoments(moments);
        setLoading(false);
      });
    } catch (error) {
      console.error("data error:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      getRemonthList((data) => {
        setAllRemonths(data);
        setLoading(false);
      });
    } catch (error) {
      console.error("data error:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setUserMoments(
      currentUser &&
        allMoments &&
        allMoments.filter((moment) => moment.user.id === currentUser.id)
    );
  }, [allMoments, currentUser]);

  useEffect(() => {
    setUserRemonths(
      currentUser &&
        allRemonths &&
        allRemonths.filter((remonth) => remonth.userData.id === currentUser.id)
    );
  }, [allRemonths, currentUser]);

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          addNewUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
            email: userAuth.email,
          })
        );
    });
  }, [dispatch]);

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

      {isMobile ? null : <Header currentUser={currentUser} />}

      {loading ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home userMoments={userMoments} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/moment" element={<Moment moments={allMoments} />} />
            <Route
              path="/moment/:id"
              element={
                <MomentDetail
                  moments={allMoments}
                  currentUser={currentUser}
                  setSuccess={setSuccess}
                />
              }
            />
            <Route
              path="/remonth"
              element={<Remonth remonths={allRemonths} />}
            />
            <Route
              path="/remonth/:id"
              element={
                <RemonthDetail
                  remonths={allRemonths}
                  currentUser={currentUser}
                />
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
                <Builder
                  userMoments={userMoments}
                  currentUser={currentUser}
                  setSuccess={setSuccess}
                />
              }
            />
            <Route
              path="/builder/remonth"
              element={
                <Builder userMoments={userMoments} setSuccess={setSuccess} />
              }
            />
            <Route path="/*" element={<NotFound />} />
            <Route path="/moment/*" element={<NotFound />} />
          </Routes>
        </div>
      )}

      {isDesktop || isTablet || pathname.includes("builder") || (
        <MobileNavbar currentUser={currentUser} />
      )}
      {success && <Success text={success} />}
    </div>
  );
}
