import { IActionReducer } from "../../../types/IActionReducer";
import { IObjectLiteralReducer } from "../../../types/ObjectLiteral";
import { IAuthState, AuthActionsType } from "../interfaces";

export const AuthLoadStorageReducer = () => {
  const REDUCERS: IObjectLiteralReducer<IAuthState, IActionReducer<AuthActionsType, IAuthState>> = {
    [AuthActionsType.LOAD_STORAGE_DATA]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...state,
      loadingAuth: true
    }),
    [AuthActionsType.LOAD_STORAGE_DATA_SUCCESS]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...state,
      ...action.payload,
      isAuthenticated: true,
      loadingAuth: false
    }),
    [AuthActionsType.LOAD_STORAGE_DATA_ERROR]: (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => ({
      ...state,
      isAuthenticated: false,
      loadingAuth: false
    })
  }

  return REDUCERS;
}
