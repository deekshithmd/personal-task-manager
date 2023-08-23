import app from "../config";
import { getFirestore, doc, deleteDoc, collection } from "firebase/firestore";

const db = getFirestore(app);

export default async function deleteTask({ uid, docId }: any) {
  let result = null,
    error = null;
  try {
    const firstCollectionRef = doc(db, "users", uid);
    result = await deleteDoc(doc(firstCollectionRef, "tasks", docId));
  } catch (e) {
    console.log("Error in adding", e);
    error = e;
  }
  return { result, error };
}
