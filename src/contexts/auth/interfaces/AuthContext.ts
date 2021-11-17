import { Dispatch, ReactNode } from "react";
import { IAuthState } from "./AuthState";
import { AuthActionsType } from "./AuthActionsType";
import { IActionReducer } from "../../../types/IActionReducer";

export interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<IActionReducer<AuthActionsType, IAuthState>>
}

export namespace IAuthContext {
  export type IProvider = {
    children: ReactNode;
  }
}


