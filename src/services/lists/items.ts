import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase/client";

const rootPath = "/lists";

export async function addItemToList(
  listId: string,
  item: Omit<Item, "claimedBy" | "claimedAt">
) {
  const listRef = doc(firestore, rootPath, listId);
  const listDoc = await getDoc(listRef);

  if (!listDoc.exists()) {
    throw new Error("Lista não encontrada");
  }

  await addDoc(collection(firestore, `${rootPath}/${listId}/items`), {
    ...item,
    claimedBy: "",
    claimedAt: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const response = await updateDoc(listRef, {
    updatedAt: serverTimestamp(),
  });

  return response;
}

export async function getItemsByListId({
  listId,
}: {
  listId: string;
  rootPath: string;
}) {
  let items: Record<string, Item> = {};

  const itemsCollection = query(
    collection(firestore, `${rootPath}/${listId}/items`)
  );

  const itemsCollectionSnap = await getDocs(itemsCollection);

  if (itemsCollectionSnap.size) {
    items = itemsCollectionSnap.docs.reduce((all, snapshot) => {
      const item = snapshot.data();
      const id = snapshot.id;

      return {
        ...all,
        [id]: { ...item, id },
      };
    }, {});
  }

  return items;
}

export async function deleteItem({
  listId,
  itemId,
}: {
  listId: string;
  itemId: string;
}) {
  const itemRef = doc(firestore, `${rootPath}/${listId}/items/${itemId}`);

  await deleteDoc(itemRef);
}

export async function deleteItems({ listId }: { listId: string }) {
  const batch = writeBatch(firestore);

  const itemsCollection = query(
    collection(firestore, `${rootPath}/${listId}/items`)
  );

  const itemsCollectionSnap = await getDocs(itemsCollection);

  itemsCollectionSnap.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export function observeListItems(
  {
    listId,
  }: {
    listId: string;
  },
  callback: (data: Record<string, Item>) => void
) {
  const itemsCollection = query(
    collection(firestore, `${rootPath}/${listId}/items`)
  );

  const unsubscribe = onSnapshot(itemsCollection, (querySnapshot) => {
    if (querySnapshot.size) {
      const items = querySnapshot.docs.reduce((all, snapshot) => {
        const item = snapshot.data();
        const id = snapshot.id;

        return {
          ...all,
          [id]: { ...item, id },
        };
      }, {});

      callback(items);
    }
  });

  return unsubscribe;
}
