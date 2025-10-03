import {
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { database } from "./client";

export async function writeExample(
  path: string,
  value: unknown
): Promise<void> {
  await set(ref(database, path), value);
}

export async function readOnce<T>(path: string): Promise<T | null> {
  const snapshot = await get(ref(database, path));
  return snapshot.exists() ? (snapshot.val() as T) : null;
}

export function subscribeValue<T>(
  path: string,
  callback: (value: T | null) => void
): () => void {
  const r = ref(database, path);
  const unsub = onValue(r, (snap) => {
    callback(snap.exists() ? (snap.val() as T) : null);
  });
  return () => unsub();
}

export async function pushItem<T>(path: string, value: T): Promise<string> {
  const r = ref(database, path);
  const newRef = push(r);
  await set(newRef, value);
  return newRef.key as string;
}

export async function updateItem<T extends Record<string, unknown>>(
  path: string,
  partial: T
): Promise<void> {
  await update(ref(database, path), partial);
}

export async function removeItem(path: string): Promise<void> {
  await remove(ref(database, path));
}
