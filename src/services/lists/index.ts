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
import { firestore } from "../firebase/client";
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

export async function getListsByOwner(ownerId: string) {
  // TODO: onSnapshot version
  const lists: ListCollection = [];

  const collectionQuery = query(
    collection(firestore, path),
    where(`ownerId`, "==", ownerId)
  );

  const collectionSnapshot = await getDocs(collectionQuery);

  collectionSnapshot.forEach((snapshot) => {
    const data = snapshot.data();

    lists.push({
      ...(data as List),
      id: snapshot.id,
    });
  });

  return lists;
}

export function gitListByIdObserver({
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

export async function claimItem({
  claimedBy,
  itemId,
  listId,
}: {
  listId: string;
  itemId: string;
  claimedBy: string;
}) {
  const itemRef = doc(firestore, `${path}/${listId}/items`, itemId);

  await updateDoc(itemRef, {
    claimedBy,
    claimedAt: serverTimestamp(),
  });

  const response = await getListById(listId);

  return response;
}

export async function unclaimItem({
  itemId,
  listId,
}: {
  listId: string;
  itemId: string;
}) {
  const itemRef = doc(firestore, `${path}/${listId}/items`, itemId);

  await updateDoc(itemRef, {
    claimedBy: "",
    claimedAt: "",
  });

  const response = await getListById(listId);

  return response;
}

export async function deleteList(listId: string) {
  const docRef = doc(firestore, path, listId);

  await deleteItems({ listId });

  await updateDoc(docRef, {
    items: deleteField(),
  });

  await deleteDoc(docRef);
}
