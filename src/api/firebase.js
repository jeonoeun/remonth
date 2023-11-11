import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, onSnapshot } from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
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

const database = getDatabase();

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

// 데이터 추가하기
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

// 데이터 가져오기
export function getData() {
  onSnapshot(doc(db, "moments"), (doc) => {
    console.log("Current data: ", doc.data());
  });
}

export async function getMomentList() {
  return get(ref(database, `moments`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function addNewRemonth(remonthData, user) {
  const id = uuid();
  const data = {
    ...remonthData,
    id,
    userEmail: user.email,
    userImage: user.image,
    userName: user.name,
    userId: user.id,
  };
  return set(ref(database, `remonths/${id}`), data);
}

export async function getRemonthList() {
  return get(ref(database, `remonths`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export function removeData(id) {
  remove(ref(database, `moments/${id}`));
}

export function addLikeUser(id, userId) {
  const postListRef = ref(database, `moments/${id}/likeUsers`);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    userId,
  });
}

export function getLikeUser(userId, callback) {
  const likeUsersRef = ref(database, "moments/" + userId + "/likeUsers");
  onValue(likeUsersRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(Object.values(snapshot.val()));
    } else {
      callback([]);
    }
  });
}

export async function removeLikeUser(id, userIndex) {
  const databaseRef = ref(database, `moments/${id}/likeUsers`);

  const snapshot = await get(databaseRef);
  if (snapshot.exists()) {
    const likeUsers = snapshot.val();
    const userKeyToDelete = Object.keys(likeUsers)[userIndex];

    remove(ref(database, `moments/${id}/likeUsers/${userKeyToDelete}`));
  }
}

export function addComment(id, comment) {
  const commentId = uuid();
  const databaseRef = ref(database, "moments/" + id + "/comments");
  const newCommentRef = push(databaseRef);
  set(newCommentRef, {
    ...comment,
    commentId,
  });
}

export function getComments(id, callback) {
  const databaseRef = ref(database, "moments/" + id + "/comments");
  onValue(databaseRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(Object.values(snapshot.val()));
    } else {
      callback([]);
    }
  });
}

export async function removeComment(id, userIndex) {
  const databaseRef = ref(database, `moments/${id}/comments`);

  const snapshot = await get(databaseRef);
  if (snapshot.exists()) {
    const comments = snapshot.val();
    const userKeyToDelete = Object.keys(comments)[userIndex];

    remove(ref(database, `moments/${id}/comments/${userKeyToDelete}`));
  }
}
