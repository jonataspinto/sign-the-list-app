import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";

import { createUser, getByEmail } from "../users";
import { auth } from "./client";

const provider = new GoogleAuthProvider();

export async function signUpWithEmail({
  name,
  email,
  password,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<User> {
  await createUserWithEmailAndPassword(auth, email, password);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuário não autenticado após o cadastro");
  }

  sendEmailVerification(currentUser!);

  const user = await createUser({
    email,
    name,
  });

  await signOut(auth);

  return user;
}

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
