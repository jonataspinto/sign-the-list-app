import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/client";

const path = "/users";

export async function getUsers() {
  const users: UserCollection = [];

  const collectionQuery = query(collection(firestore, path));

  const collectionSnapshot = await getDocs(collectionQuery);

  collectionSnapshot.forEach((snapshot) => {
    const data = snapshot.data();

    users.push({
      ...(data as User),
      id: snapshot.id,
      createdAt: data?.createdAt?.toDate?.(),
      updatedAt: data?.updatedAt?.toDate?.(),
    });
  });

  return users;
}

export async function getByEmail(email: string) {
  const list: UserCollection = [];

  const collectionQuery = query(
    collection(firestore, path),
    where(`email`, "==", email)
  );

  const collectionSnapshot = await getDocs(collectionQuery);

  collectionSnapshot.forEach((snapshot) => {
    const data = snapshot.data();

    list.push({
      ...(data as User),
      id: snapshot.id,
      createdAt: data?.createdAt?.toDate?.(),
      updatedAt: data?.updatedAt?.toDate?.(),
    });
  });

  return list[0];
}

export async function getById(id: string) {
  const docRef = doc(firestore, path, id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as User;

  return {
    ...data,
    id: docSnap.id,
  };
}

export async function createUser(payload: {
  name: string;
  email: string;
  photoURL?: string;
  plan?: Plan;
}) {
  const userExist = await getByEmail(payload.email);

  if (userExist) {
    return userExist;
  }

  const newData = await addDoc(collection(firestore, path), {
    plan: "free",
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const response = await getDoc(newData);

  return response.data() as User;
}
