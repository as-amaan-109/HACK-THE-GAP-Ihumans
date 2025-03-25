import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";


export const updateForkedCourse = async ({ uid, data, forkedCourseId, courseChapters }) => {
  if (!uid || !forkedCourseId || !data) {
    throw new Error("Missing required details (uid, forkedCourseId, data)");
  }

  const forkedCourseRef = doc(db, `users/${uid}/forkedCourses/${forkedCourseId}`);

  await updateDoc(forkedCourseRef, {
    ...data,
    courseChapters: courseChapters || [],
    updatedAt: new Date(),
  });
};
