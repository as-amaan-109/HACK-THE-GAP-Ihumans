import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";
import { generateRandomId } from "../utils";

export const publishForkedCourse = async ({
  uid,
  forkedCourseId,
  instructureUid,
  instructureName,
  instructureEmail,
  instructurePhotoURL,
}) => {
  if (!uid || !forkedCourseId) {
    throw new Error("Missing required details (uid, forkedCourseId)");
  }

  const forkedCourseRef = doc(
    db,
    `users/${uid}/forkedCourses/${forkedCourseId}`
  );
  const forkedCourseSnap = await getDoc(forkedCourseRef);

  if (!forkedCourseSnap.exists()) {
    throw new Error("Forked course not found");
  }

  const forkedCourseData = forkedCourseSnap.data();
  const courseId = generateRandomId(16);
  await setDoc(doc(db, `courses/${courseId}`), {
    ...forkedCourseData,
    courseId:courseId,
    instructureUid,
    instructureName,
    instructureEmail,
    instructurePhotoURL,
    createdAt: Timestamp.now(),
  });

  return forkedCourseId;
};
