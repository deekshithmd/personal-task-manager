import app from "../config";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, collection, getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let signupData = null,
    error = null;
  try {
    signupData = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", signupData?.user?.uid), {
      email,
      password,
    });
  } catch (e) {
    error = e;
  }

  return { signupData, error };
}
