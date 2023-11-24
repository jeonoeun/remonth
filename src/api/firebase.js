import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  onSnapshot,
  collection,
  query,
  deleteDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCt85_Yc5ta22H8ckRrwMUK4ZvwGPByg3I",
  authDomain: "remonth-d68c4.firebaseapp.com",
  projectId: "remonth-d68c4",
  storageBucket: "remonth-d68c4.appspot.com",
  messagingSenderId: "140253864757",
  appId: "1:140253864757:web:ef49ad9c75c3ad4d42a27c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//로그인
export function login() {
  signInWithPopup(auth, googleProvider).catch((error) => console.error(error));
}

//로그아웃
export function logout() {
  signOut(auth).catch((error) => {
    console.error(error);
  });
}

//유저 상태 관리
export function onUserChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

//모먼트 추가하기
export async function addNewMoment(moment, image, user, date) {
  const id = uuid();
  const data = {
    ...moment,
    id,
    user,
    image,
    date,
  };

  await setDoc(doc(db, "moments", id), data);
}

//모먼트 가져오기
export function getMomentList(callback) {
  const q = query(collection(db, "moments"));
  onSnapshot(q, (querySnapshot) => {
    const moments = [];
    querySnapshot.forEach((doc) => {
      moments.push(doc.data());
    });
    callback(moments);
  });
}

//모먼트 삭제
export async function removeMoment(id) {
  const docRef = doc(db, "moments", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
}

// 좋아요 유저 추가하기
export async function addLikeUser(id, userId) {
  const likeUsersRef = doc(db, "moments", id);

  await updateDoc(likeUsersRef, {
    likeUsers: arrayUnion(userId),
  });
}

// 좋아요 유저 삭제하기
export async function removeLikeUser(id, userId) {
  const likeUsersRef = doc(db, "moments", id);

  await updateDoc(likeUsersRef, {
    likeUsers: arrayRemove(userId),
  });
}

// 좋아요 유저 가져오기
export function getLikeUsers(id, callback) {
  const docRef = doc(db, "moments", id);
  const unsubscriber = onSnapshot(docRef, (snapshot) => {
    const item = snapshot.data();
    callback(item.likeUsers ? item.likeUsers : []);
  });

  // unsubscriber(); // 구독을 해제할 때 사용
}

// 댓글 등록
export async function addComment(id, comment) {
  const docRef = doc(db, "moments", id);

  await updateDoc(docRef, {
    comments: arrayUnion(comment),
  });
}

// 댓글 가져오기
export async function getComments(id, callback) {
  const docRef = doc(db, "moments", id);
  const unsubscriber = onSnapshot(docRef, (snapshot) => {
    const item = snapshot.data();
    callback(item.comments ? item.comments : []);
  });
}

// 댓글 삭제
export async function removeComment(id, list) {
  const docRef = doc(db, "moments", id);

  await updateDoc(docRef, {
    comments: arrayRemove(list),
  });
}

//월간지 추가하기
export async function addNewRemonth(remonthData, userData) {
  const id = uuid();
  const data = {
    ...remonthData,
    id,
    userData,
  };
  await setDoc(doc(db, "remonths", id), data);
}

//월간지 가져오기
export async function getRemonthList(callback) {
  const q = query(collection(db, "remonths"));
  onSnapshot(q, (querySnapshot) => {
    const remonths = [];
    querySnapshot.forEach((doc) => {
      remonths.push(doc.data());
    });
    callback(remonths);
  });
}

// 월간지 좋아요 유저 추가하기
export async function addRemonthLikeUser(id, userId) {
  const likeUsersRef = doc(db, "remonths", id);

  await updateDoc(likeUsersRef, {
    likeUsers: arrayUnion(userId),
  });
}

// 월간지 좋아요 유저 삭제하기
export async function removeRemonthLikeUser(id, userId) {
  const likeUsersRef = doc(db, "remonths", id);

  await updateDoc(likeUsersRef, {
    likeUsers: arrayRemove(userId),
  });
}

// 월간지 좋아요 유저 가져오기
export function getRemonthLikeUsers(id, callback) {
  const docRef = doc(db, "remonths", id);
  const unsubscriber = onSnapshot(docRef, (snapshot) => {
    const item = snapshot.data();
    callback(item.likeUsers && item.likeUsers);
  });

  // unsubscriber(); // 구독을 해제할 때 사용
}
