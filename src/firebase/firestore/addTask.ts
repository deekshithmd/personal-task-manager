import app from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import { addTaskType } from "@/types/types";

const db = getFirestore(app);

export default async function addTask({
  taskName,
  taskDescription,
  uid,
}: addTaskType) {
  let result = null,
    error = null;
  try {
    const firstCollectionRef = doc(db, "users", uid);
    const secondCollectionRef = collection(firstCollectionRef, "tasks");
    result = await addDoc(secondCollectionRef, {
      taskName,
      taskDescription,
      isCompleted: false,
    });
  } catch (e) {
    console.log("Error in adding", e);
    error = e;
  }
  return { result, error };
}
