import { Dispatch, ReactNode } from "react";
import { IActionReducer } from "../../../types/IActionReducer";
import { IList } from "../../../types/IList";
import { IObjectLiteral } from "../../../types/ObjectLiteral";

export enum APP_ACTIONS {
  LOAD_LISTS= "LOAD_LISTS",
}

export type IAppState = {
  lists?: IObjectLiteral<IList>
}

export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<IActionReducer<APP_ACTIONS, IAppState>>
}

export type IAppContextProvider = {
  children: ReactNode;
}