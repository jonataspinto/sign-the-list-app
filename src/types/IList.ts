import { IObjectLiteral } from './ObjectLiteral'

export type Subscriber = {
  email: string;
  name: string;
  photoURL: string;
}

export type IItem = {
  description: string;
  name: string;
  photoURL: string;
  subscriber: Subscriber;
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
