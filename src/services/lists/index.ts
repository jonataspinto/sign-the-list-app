import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/client";

const path = "/lists";

export async function getLists() {
  const users: ListCollection = [];

  const collectionQuery = query(collection(firestore, path));

  const collectionSnapshot = await getDocs(collectionQuery);

  collectionSnapshot.forEach((snapshot) => {
    const data = snapshot.data();

    users.push({
      ...(data as List),
      id: snapshot.id,
    });
  });

  return users;
}

export async function getListsByOwner(ownerId: string) {
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

export async function getListById(listId: string) {
  const docRef = doc(firestore, path, listId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...(docSnap.data() as List),
      id: docSnap.id,
    };
  } else {
    throw new Error("Lista não encontrada");
  }
}

export async function addItemToList(
  listId: string,
  item: Omit<Item, "claimedBy" | "claimedAt">
) {
  const listRef = doc(firestore, path, listId);
  const listDoc = await getDoc(listRef);

  if (!listDoc.exists()) {
    throw new Error("Lista não encontrada");
  }

  const currentList = listDoc.data() as List;
  const newItem: Item = {
    ...item,
    claimedBy: "",
    claimedAt: "",
  };

  const updatedItems = [...currentList.items, newItem];

  await updateDoc(listRef, {
    items: updatedItems,
    updatedAt: serverTimestamp(),
  });

  return newItem;
}

export async function createList(payload: Omit<List, "id">) {
  const newData = await addDoc(collection(firestore, path), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const response = await getDoc(newData);

  return response.data() as List;
}
