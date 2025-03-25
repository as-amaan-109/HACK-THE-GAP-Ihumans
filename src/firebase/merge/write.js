import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../config"
import { generateRandomId } from "../utils"

export const createMergeRequest= async({courseId,forkedCourseData})=>{
    const mergeRequestId = generateRandomId(16);
    const docRef = doc(db,`courses/${courseId}/mergeRequests/${mergeRequestId}`)
    await setDoc(docRef,{
        ...forkedCourseData,
        mergeRequestId:mergeRequestId,
        createdAt:Timestamp.now(),
    })
}