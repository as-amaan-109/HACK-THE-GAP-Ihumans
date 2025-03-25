import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config";

export const getCourse = async ({ id }) => {
    const ref = doc(db, `courses/${id}`);
    const res = await getDoc(ref);
    if (res.exists()) {
      return res.data();
    } else {
      return null;
    }
  };

export const getAllCourses = async () =>{
  try {
    const snapshots = await getDocs(query(collection(db,'courses'),orderBy("createdAt","desc")))
    return snapshots.docs.length > 0 ? snapshots.docs.map(item => item.data()) : null;
  } catch (error) {
    console.log(error)
    return null;
  }
}