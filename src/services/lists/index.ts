import {
  // updateDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  // doc,
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

export async function getByOwner(ownerId: string) {
  const list: ListCollection = [];

  const collectionQuery = query(
    collection(firestore, path),
    where(`ownerId`, "==", ownerId)
  );

  const collectionSnapshot = await getDocs(collectionQuery);

  collectionSnapshot.forEach((snapshot) => {
    const data = snapshot.data();

    list.push({
      ...(data as List),
      id: snapshot.id,
    });
  });

  return list[0];
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
