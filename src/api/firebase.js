import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
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
  apiKey: "AIzaSyDWAWCCljE81rT53p76HiaxlnmbRvEWeWc",
  authDomain: "remo-f87a3.firebaseapp.com",
  projectId: "remo-f87a3",
  databaseURL:
    "https://remo-f87a3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, googleProvider).catch((error) => console.error(error));
}

export function logout() {
  signOut(auth).catch((error) => {
    console.error(error);
  });
}

export function onUserChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function addNewMoment(moment, image, user, date) {
  const id = uuid();
  const momentData = {
    ...moment,
    id,
    user,
    image,
    date,
  };

  return set(ref(database, `moments/${id}`), momentData);
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
