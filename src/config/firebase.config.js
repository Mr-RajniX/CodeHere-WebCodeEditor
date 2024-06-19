import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  // apiKey: "AIzaSyC0NOu3tyx2wTu4u_kRZXFbtAVprBxkFN8",
  // authDomain: "web-code-editor-4ddae.firebaseapp.com",
  // projectId: "web-code-editor-4ddae",
  // storageBucket: "web-code-editor-4ddae.appspot.com",
  // messagingSenderId: "221210971041",
  // appId: "1:221210971041:web:2c239fc3486086fd0519e0"
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
