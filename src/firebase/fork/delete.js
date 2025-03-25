import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

export const deleteFork = async ({ uid, forkedCourseId }) => {
  if (!uid || !forkedCourseId) {
    throw new Error("Missing required details (uid, forkedCourseId)");
  }

  const forkedCourseRef = doc(
    db,
    `users/${uid}/forkedCourses/${forkedCourseId}`
  );

  await deleteDoc(forkedCourseRef);
};
