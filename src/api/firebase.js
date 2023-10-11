import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
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
