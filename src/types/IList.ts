import { IObjectLiteral } from './ObjectLiteral'

export type ISubscriber = {
  email: string;
  name: string;
  photoURL: string;
}

export type IItem = {
  description: string;
  name: string;
  photoURL: string;
  subscriber: ISubscriber;
}

export type IList = {
  description: string;
  email: string;
  id: string;
  items: IItem[];
  name: string;
  phoneNumber: string;
  photoURL: string;
}

export type ILists = {
  lists: IObjectLiteral<IList>
}
