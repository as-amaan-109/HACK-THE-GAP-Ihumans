import { db } from "../config";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  Timestamp,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { generateRandomId } from "../utils";

export const createFork = async ({ courseId, uid }) => {
  if (!courseId || !uid) {
    throw new Error("Missing necessary details (courseId, uid)");
  }
  // Fetch Course DATA
  const courseRef = doc(db, "courses", courseId);
  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    return "Course not found";
  }

  const courseSnapData = courseSnap.data();
  // Input validation
  if (!courseSnapData || typeof courseSnapData !== "object") {
    throw new Error("Invalid or missing course data");
  }

  // Generate unique course ID
  const forkedCourseId = generateRandomId(16);

  // Prepare the document data
  const courseData = {
    forkedCourseId,
    ...courseSnapData,
    forkedBy: uid,
    isForked: true,
    forkedFrom: courseId,
    mergeRequestStatus: "pending",
    mergeRequestId: null,
  };
//   return courseData
  try {
    // Write to Firestore
    await setDoc(doc(db, `users/${uid}/forkedCourses`, forkedCourseId), courseData); // No merge needed for new doc
    return forkedCourseId; // Return the courseId for further use
  } catch (error) {
    console.error("Error creating Frok:", error);
    throw new Error(`Failed to create Frok: ${error.message}`);
  }
};
