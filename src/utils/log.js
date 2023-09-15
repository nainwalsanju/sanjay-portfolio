import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAZXNE0vgySH8eHZzP1_3XYlHHl4nNUh7w",
  authDomain: "sanjay-portfolio-aa3b5.firebaseapp.com",
  projectId: "sanjay-portfolio-aa3b5",
  storageBucket: "sanjay-portfolio-aa3b5.appspot.com",
  messagingSenderId: "688507155002",
  appId: "1:688507155002:web:f6e3b95f4f9261420e3b03",
  measurementId: "G-WJR799DQGP"
};

const app = initializeApp(firebaseConfig);

const isGaSupported = isSupported();

const analytics = isGaSupported ? getAnalytics(app) : null;

export const logGa = (eventName, eventParams = {}) => {
  isGaSupported ? logEvent(analytics, eventName, eventParams) : console.log(eventName, eventParams);
};
