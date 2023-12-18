import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
    apiKey: "AIzaSyChvAR0ZJ3ka7bJMbphqaeei9OyyoOIpEk",
    authDomain: "jodios-ec34f.firebaseapp.com",
    databaseURL: "https://jodios-ec34f.firebaseio.com",
    projectId: "jodios-ec34f",
    storageBucket: "jodios-ec34f.appspot.com",
    messagingSenderId: "631145256791",
    appId: "1:631145256791:web:6d5c704a0dbd0703fa5012",
    measurementId: "G-H82C76Z9GC"
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);