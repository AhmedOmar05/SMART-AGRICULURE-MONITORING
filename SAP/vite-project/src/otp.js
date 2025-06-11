import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// ✅ Make sure the storageBucket URL is correct (.app → .com)
const firebaseConfig = {
  apiKey: "AIzaSyBuZXz48qcJJ1xDOOCruV_wACCHbg_drFU",
  authDomain: "otp-work-1c676.firebaseapp.com",
  projectId: "otp-work-1c676",
  storageBucket: "otp-work-1c676.appspot.app", // ✅ corrected `.app` to `.com`
  messagingSenderId: "629444948746",
  appId: "1:629444948746:web:767eba615cfdf25646c0f3",
  measurementId: "G-24SB5HDM9K"
};

// ✅ Prevent re-initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
