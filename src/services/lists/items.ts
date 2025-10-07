import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase/client";

const rootPath = "/lists";

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

export function getItemsByListIdObserver(
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
