import { collection, query, onSnapshot, doc, orderBy } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../config";

export function useMergeRequests({ courseId }) {
  const { data, error } = useSWRSubscription(
    ["mergeRequests", courseId],
    ([, courseId], { next }) => {
      if (!courseId) return;

      const collectionRef = query(collection(db, `courses/${courseId}/mergeRequests`),orderBy("createdAt","desc"));

      const unsub = onSnapshot(
        collectionRef,
        (snapshot) => {
          next(
            null,
            snapshot.empty ? null : snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }))
          );
        },
        (error) => next(error, null)
      );

      return () => unsub();
    }
  );

  return { data, error, isLoading: data === undefined };
}



export function useMergeRequest({ courseId, mergeRequestId }) {
  const { data, error } = useSWRSubscription(
    ["mergeRequest", courseId, mergeRequestId],
    ([, courseId, mergeRequestId], { next }) => {
      if (!courseId || !mergeRequestId) return;

      const docRef = doc(db, `courses/${courseId}/mergeRequests/${mergeRequestId}`);

      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          next(null, snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
        },
        (error) => next(error, null)
      );

      return () => unsub();
    }
  );

  return { data, error, isLoading: data === undefined };
}
