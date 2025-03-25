// import { deleteDoc, deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
// import { db } from "../config";

import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

// export const deleteAssessment = async ({ uid }) => {
//     const del = await deleteDoc(doc(db, `users`,uid, 'assessment'))
// };

export const deleteAssessmentField = async ({ uid }) => {
    const userDocRef = doc(db, `users`, uid);
  
    
      await updateDoc(userDocRef, {
        assessment: deleteField(), 
      });
      await updateDoc(userDocRef, {
        recommendations: deleteField(), 
      });
  };