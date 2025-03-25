import { db } from "../config";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { generateRandomId } from "../utils";

export const createCourse = async ({
  data,
  courseChapters,
  instructureUid,
  instructureName,
  instructurePhotoURL,
}) => {
  // Input validation
  if (!data || typeof data !== "object") {
    throw new Error("Invalid or missing course data");
  }
  if (!instructureUid || !instructureName || !instructurePhotoURL) {
    throw new Error("Missing instructor details (UID, name, or photo URL)");
  }

  // Generate unique course ID
  const courseId = generateRandomId(16);

  // Prepare the document data
  const courseData = {
    courseId,
    ...data,
    courseChapters: courseChapters,
    instructureUid,
    instructureName,
    instructurePhotoURL,
    createdAt: serverTimestamp(), // Use server timestamp for consistency
  };

  try {
    // Write to Firestore
    await setDoc(doc(db, "courses", courseId), courseData); // No merge needed for new doc
    return courseId; // Return the courseId for further use
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error(`Failed to create course: ${error.message}`);
  }
};

export const updateCourse = async ({
  data,
  courseId,
  instructureUid,
  courseChapters,
  instructureName,
  instructurePhotoURL,
  instructureEmail,
}) => {
  if (!courseId) {
    throw new Error("ID is required");
  }

  await updateDoc(doc(db, `courses/${courseId}`), {
    ...data,
    courseId: courseId,
    courseChapters: courseChapters,
    instructureUid: instructureUid,
    instructureName: instructureName,
    instructurePhotoURL: instructurePhotoURL,
    instructureEmail: instructureEmail,
    createdAt: Timestamp.now(),
  });
};
