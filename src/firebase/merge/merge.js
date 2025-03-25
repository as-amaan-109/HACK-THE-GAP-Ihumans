import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";

export const mergeCourse = async ({ courseId, mergeRequestId }) => {
    if (!courseId || !mergeRequestId) {
      throw new Error("Missing necessary details (courseId, mergeRequestId)");
    }
  
    // References to Firestore documents
    const courseRef = doc(db, "courses", courseId);
    const mergeRequestRef = doc(db, `courses/${courseId}/mergeRequests`, mergeRequestId);
  
    // Fetch Course & Merge Request Data
    const [courseSnap, mergeRequestSnap] = await Promise.all([
      getDoc(courseRef),
      getDoc(mergeRequestRef),
    ]);
  
    if (!courseSnap.exists() || !mergeRequestSnap.exists()) {
      throw new Error("Course or Merge Request not found");
    }
  
    const mergeRequestData = mergeRequestSnap.data();
    const courseData = courseSnap.data();
    const { contributers = [] } = courseData;
    const newContributor = mergeRequestData.requestedBy;
  
    // Check if the contributor already exists based on email (or use 'uid' if available)
    const isAlreadyContributor = contributers.some(
      (contributor) => contributor.email === newContributor.email
    );
  
    // Update Course Data with Merge Request Data (excluding contributors update)
    await updateDoc(courseRef, {
      category: mergeRequestData.category,
      coursePrice: mergeRequestData.coursePrice,
      courseTitle: mergeRequestData.courseTitle,
      createdAt: mergeRequestData.createdAt,
      description: mergeRequestData.description,
      language: mergeRequestData.language,
      level: mergeRequestData.level,
      posterURL: mergeRequestData.posterURL,
      shortDescription: mergeRequestData.shortDescription,
      courseChapters: mergeRequestData.courseChapters,
      ...(isAlreadyContributor ? {} : { contributers: [...contributers, newContributor] }),
    });
  
    // Update Merge Request Status
    await updateDoc(mergeRequestRef, {
      status: "approved",
    });
  
    return true;
  };

export const rejectMergeRequest = async ({ courseId, mergeRequestId }) => {
    if (!courseId || !mergeRequestId) {
      throw new Error("Missing necessary details (courseId, mergeRequestId)");
    }
  
    const mergeRequestRef = doc(db, `courses/${courseId}/mergeRequests`, mergeRequestId);
  
    await updateDoc(mergeRequestRef, {
      status: "rejected",
    });
  
    return true
  };