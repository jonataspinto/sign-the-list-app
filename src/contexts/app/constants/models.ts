import { Dispatch, ReactNode } from "react";
import { IActionReducer } from "../../../types/IActionReducer";
import { IList } from "../../../types/IList";
import { STATUS_TYPES } from "../../../types/IStatus";
import { IObjectLiteral } from "../../../types/ObjectLiteral";

export enum APP_ACTIONS {
  FETCH_LISTS= "FETCH_LISTS",
  LOAD_LIST= "LOAD_LIST",
  IS_FETCHING= "IS_FETCHING",
  HAS_ERROR= "HAS_ERROR",
  ASSINGN_ITEM= "ASSINGN_ITEM",
}

export type IAppState = {
  lists?: IObjectLiteral<IList>
  list?: IList
  status?: STATUS_TYPES
}

export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<IActionReducer<APP_ACTIONS, IAppState>>
}

export type IAppContextProvider = {
  children: ReactNode;
}