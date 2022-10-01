import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDI_FvAf8XQkXcQKbmX94LsXS8AGWynIEM",
  authDomain: "reflected-cycle-364003.firebaseapp.com",
  projectId: "reflected-cycle-364003",
  storageBucket: "reflected-cycle-364003.appspot.com",
  messagingSenderId: "441041351446",
  appId: "1:441041351446:web:4e6714e500cdf7bd2c5637",
  measurementId: "G-V9M91B6325"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);