import { IAuthState, AuthActionsType } from "../interfaces";
import { IObjectLiteralReducer } from "../../../types/ObjectLiteral";
import { IActionReducer } from "../../../types/IActionReducer";
import { initialStateAuthReducer } from ".";

export const AuthSetUserReducer = () => {
  const REDUCERS: IObjectLiteralReducer<IAuthState, IActionReducer<AuthActionsType, IAuthState>> = {
    [AuthActionsType.SET_USER]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...state,
      loadingAuth: true,
    }),
    [AuthActionsType.SET_USER_SUCCESS]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...state,
      ...action.payload,
      loadingAuth: false,
    }),
    [AuthActionsType.SET_USER_ERROR]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...initialStateAuthReducer,
    }),
  }

  return REDUCERS;
}
