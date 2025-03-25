import { doc, setDoc } from "firebase/firestore"
import { db } from "../config"

export const submitAssessment = async ({uid,submissionData})=>{
    await setDoc(doc(db,`users/${uid}`),{
        assessment:{...submissionData}
    },{
        merge:true
    })
}