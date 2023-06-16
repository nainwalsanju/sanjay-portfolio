import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCCsXxxBUkFuPK3b6zZRQB0lsICFmuG2Uc",
  authDomain: "react-resume-c803b.firebaseapp.com",
  projectId: "react-resume-c803b",
  storageBucket: "react-resume-c803b.appspot.com",
  messagingSenderId: "998691702191",
  appId: "1:998691702191:web:6985bce782ebc833ab1b5a",
  measurementId: "G-WXRWNKJ7LR"
};

const app = initializeApp(firebaseConfig);

const isGaSupported = isSupported();

const analytics = isGaSupported ? getAnalytics(app) : null;

export const logGa = (eventName, eventParams = {}) => {
  isGaSupported ? logEvent(analytics, eventName, eventParams) : console.log(eventName, eventParams);
};
