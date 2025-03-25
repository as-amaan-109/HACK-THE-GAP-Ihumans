import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

export const getUserAssessment = async ({ uid }) => {
  console.log("get user assessment called");
  
  const res = await getDoc(doc(db, `users/${uid}`));
  //   console.log(res.exists());
  if (await res.exists()) {
    return res.data()?.assessment;
  } else {
    return null
    // throw new Error("Assessment is Not Submitted");
  }
};
