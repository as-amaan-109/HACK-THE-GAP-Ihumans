import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";


export const setRoadmap = async ({ uid, roadmap }) => {
    if (!roadmap) {
      throw new Error("No Roadmap found")  
    }
    console.log("Ai given Roadmap::",roadmap?.response);
    
  await setDoc(
    doc(db, `users/${uid}`),
    {
        recommendations:{ ...roadmap?.response },
    },
    { merge: true }
  );
};

// Store recommendations back in the user document
        // await setDoc(doc(db, `users/${uid}`), {
        //     recommendations,
        //     recommendationsGeneratedAt: new Date().toISOString()
        // }, { merge: true });

export const setRecommendation= async ({uid,recommendations})=>{
  await setDoc(
    doc(db, `users/${uid}`),
    {
      recommendations: recommendations,
     generatedAt: Timestamp.now(),
    },
    { merge: true }
  );
  return true
}