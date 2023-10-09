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

const firebaseConfig = {
  apiKey: "AIzaSyDWAWCCljE81rT53p76HiaxlnmbRvEWeWc",
  authDomain: "remo-f87a3.firebaseapp.com",
  projectId: "remo-f87a3",
};

const app = initializeApp(firebaseConfig);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

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
