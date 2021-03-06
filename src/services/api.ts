import { IList } from "../types/IList";
import { IObjectLiteral } from "../types/ObjectLiteral";
import firebase from "./firebase";

// eslint-disable-next-line no-unused-vars
export const getLists = (callback:(data: IObjectLiteral<IList>) => void) => {
  let data: IObjectLiteral<IList> = {} as IObjectLiteral<IList>;
  firebase
    .database()
    .ref("dev")
    .on("value", (snapshot) => {
      const response = snapshot.val() as IObjectLiteral<IList>;

      data = response;

      callback(response);
    });

  return data;
};

// eslint-disable-next-line no-unused-vars
export const getListById = (id: string, callback:(data: IList) => void) => {
  firebase
    .database()
    .ref(`dev/lists/${id}`)
    .on("value", (snapshot) => {
      const response = snapshot.val() as IList;

      callback(response);
    });
};

export const updateList = (id: string, newList: IList) => {
  firebase
    .database()
    .ref("dev/lists")
    .child(id)
    .set(newList);
};
