import app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export default async function updateTask({ uid, docId, data }: any) {
  let result = null,
    error = null;
  try {
    const firstCollectionRef = doc(db, "users", uid);
    const secondCollectionRef = doc(firstCollectionRef, "tasks", docId);
    result = await updateDoc(secondCollectionRef, {
      ...data,
    });
  } catch (e) {
    console.log("Error in adding", e);
    error = e;
  }
  return { result, error };
}
