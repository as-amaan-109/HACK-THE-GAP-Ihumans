import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);





export const getRoadmap = async ({ uid }) => {
  const res = await getDoc(doc(db, `users/${uid}`));
  if (await res.exists()) {
    return res.data()?.recommendations;
  } else {
    return null;
    // throw new Error("Assessment is Not Submitted");
  }
};

