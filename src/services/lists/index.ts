import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { deleteItems, getItemsByListId } from "./items";

const path = "/lists";

export async function createList(payload: Omit<List, "id" | "items">) {
  const newData = await addDoc(collection(firestore, path), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const response = await getDoc(newData);

  return response.data() as List;
}

export function observeListsByOwner(
  ownerId?: string,
  callback?: (data: ListCollection) => void
) {
  if (!ownerId) {
    return () => {};
  }

  const collectionQuery = query(
    collection(firestore, path),
    where(`ownerId`, "==", ownerId)
  );

  const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
    if (snapshot.size) {
      const data: ListCollection = [];

      snapshot.docs.forEach((doc) => {
        const values = doc.data() as List;

        data.push({
          ...values,
          id: doc.id,
        });
      });
      callback?.(data);
    } else {
      callback?.([]);
    }
  });

  return unsubscribe;
}

export function observeList({
  listId,
  callback,
}: {
  listId: string;
  callback: (data?: List) => void;
}) {
  const docRef = doc(firestore, path, listId);

  const unsubscribe = onSnapshot(docRef, async (snapshot) => {
    if (!snapshot.exists()) {
      return callback();
    }

    const data = snapshot.data() as List;

    const items = await getItemsByListId({
      listId,
      rootPath: path,
    });

    callback({ ...data, id: snapshot.id, items });
  });

  return unsubscribe;
}

export async function getListById(listId: string) {
  const docRef = doc(firestore, path, listId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const items = await getItemsByListId({
      listId,
      rootPath: path,
    });

    return {
      ...docSnap.data(),
      id: docSnap.id,
      items,
    } as List;
  } else {
    throw new Error("Lista não encontrada");
  }
}

export async function getListByShareCode(shareCode: string) {
  const collectionQuery = query(
    collection(firestore, path),
    where("shareCode", "==", shareCode)
  );

  const collectionSnapshot = await getDocs(collectionQuery);

  if (collectionSnapshot.empty) {
    throw new Error("Lista não encontrada com este código");
  }

  const doc = collectionSnapshot.docs[0];

  const items = await getItemsByListId({
    listId: doc.id,
    rootPath: path,
  });

  return {
    ...(doc.data() as List),
    id: doc.id,
    items,
  };
}

export async function deleteList(listId: string) {
  const docRef = doc(firestore, path, listId);

  await deleteItems({ listId });

  await updateDoc(docRef, {
    items: deleteField(),
  });

  await deleteDoc(docRef);
}

export async function updateList(listId: string, payload: Partial<List>) {
  const docRef = doc(firestore, path, listId);

  const response = await updateDoc(docRef, {
    ...payload,
    updatedAt: serverTimestamp(),
  });

  return response;
}
