import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";

import { createUser, getByEmail } from "../users";
import { auth } from "./client";

const provider = new GoogleAuthProvider();

export async function loginWithEmail(
  email: string,
  password: string
): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);

  const user = await getByEmail(result.user.email!);

  return user;
}

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, provider);

  const user = await createUser({
    email: result.user.email!,
    name: result.user.displayName!,
    photoURL: result.user.photoURL!,
  });

  return user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function subscribeAuth(
  callback: (user: FirebaseUser | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}
