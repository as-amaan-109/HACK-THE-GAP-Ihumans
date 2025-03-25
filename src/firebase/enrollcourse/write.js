import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../config"

export const enrollToCourse = async({courseId,uid})=>{
    await setDoc(doc(db,`users/${uid}/enrolledcourses/${courseId}`),{
        courseId:courseId,
        enrolledAt:Timestamp.now(),
    });
}