import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";

export const deleteCourse = async({id})=>{
    await deleteDoc(doc(db, `courses/${id}`));
}