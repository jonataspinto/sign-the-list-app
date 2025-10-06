import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
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
