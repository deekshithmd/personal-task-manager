import app from "../config";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

export default async function getTask(uid: string) {
  let result = null,
    error = null;
  const taskArray: any[] = [];
  try {
    const dbRef = collection(db, `users/${uid}/tasks`);

    result = await getDocs(dbRef);

    result.docs.map((doc) => {
      taskArray?.push({ ...doc?.data(), id: doc?.id });
    });
  } catch (e) {
    console.log("Error in adding", e);
    error = e;
  }
  return { taskArray, error };
}
