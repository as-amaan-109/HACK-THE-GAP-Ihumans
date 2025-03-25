import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../config";

// Fetch all forked courses by a user
export function useAllForkedCourses({ uid }) {
    const { data, error } = useSWRSubscription(
      ["forkedCourses", uid],
      ([path, uid], { next }) => {
        const collectionRef = collection(db, `users/${uid}/forkedCourses`);
        const unsub = onSnapshot(
          collectionRef,
          (snapshot) => {
            next(
              null,
              snapshot.empty ? null : snapshot.docs.map((snap) => ({
                id: snap.id,
                ...snap.data(),
              }))
            );
          },
          (error) => next(error, null)
        );
        return () => unsub();
      }
    );
    return { data, error, isLoading: data === undefined };
  }


  // Fetch a forked course by its forkedCourseId
export function useForkedCourse({ uid, forkedCourseId }) { 
    const { data, error } = useSWRSubscription(
      ["forkedCourses", uid, forkedCourseId],
      ([path, uid, forkedCourseId], { next }) => {
        const docRef = doc(db, `users/${uid}/forkedCourses/${forkedCourseId}`);
        const unsub = onSnapshot(
          docRef,
          (snapshot) => {
            next(null, !snapshot.exists() ? null : { id: snapshot.id, ...snapshot.data() });
          },
          (error) => next(error, null)
        );
        return () => unsub();
      }
    );
    return { data, error, isLoading: data === undefined };
  }



export const getForkedCourse = async ({ uid, forkedCourseId }) => {
  if (!uid || !forkedCourseId) {
    throw new Error("Missing required details (uid, forkedCourseId)");
  }

  const forkedCourseRef = doc(db, `users/${uid}/forkedCourses/${forkedCourseId}`);
  const forkedCourseSnap = await getDoc(forkedCourseRef);

  return forkedCourseSnap.exists() ? forkedCourseSnap.data() : null;
};
