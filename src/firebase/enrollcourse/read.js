import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../config";

export function useEnrolledCourses({ uid }) {
    const { data, error } = useSWRSubscription(
      ["enrolledcourses", uid],
      ([path, id], { next }) => {
        const collectionRef = query(
            collection(db, `users/${uid}/enrolledcourses`),
            orderBy("enrolledAt","desc")
        );
        const unsub = onSnapshot(
            collectionRef,
          (snapshots) => {
            next(null, snapshots.docs.length > 0 ? snapshots.docs.map(item => item.data()) : null);
          },
          (error) => next(error, null)
        );
        return () => unsub();
      }
    );
    return { data, error, isLoading: data === undefined };
  }
export function useEnrolledCourse({ uid,courseId }) {
    const { data, error } = useSWRSubscription(
      ["enrolledcourses", uid,courseId],
      ([path, id], { next }) => {
       const docRef = doc(db, `users/${uid}/enrolledcourses/${courseId}`)
        const unsub = onSnapshot(
            docRef,
          (snapshot) => {
            next(null, !snapshot.exists() ? null : snapshot.data());
          },
          (error) => next(error, null)
        );
        return () => unsub();
      }
    );
    return { data, error, isLoading: data === undefined };
  }