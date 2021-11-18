import { IAuthState, AuthActionsType } from "../interfaces";
import { IObjectLiteralReducer } from "../../../types/ObjectLiteral";
import { IActionReducer } from "../../../types/IActionReducer";

export const AuthLoginGoogleReducer = () => {
  const REDUCERS: IObjectLiteralReducer<IAuthState, IActionReducer<AuthActionsType, IAuthState>> = {
    [AuthActionsType.LOGIN_GOOGLE]: (
      state: IAuthState,
    ) => ({
      ...state,
      loadingAuth: true,
    }),
    [AuthActionsType.LOGIN_GOOGLE_SUCCESS]: (
      state: IAuthState,
      action: IActionReducer<AuthActionsType, IAuthState>,
    ) => ({
      ...state,
      ...action.payload,
      isAuthenticated: true,
      loadingAuth: false,
    }),
    [AuthActionsType.LOGIN_GOOGLE_ERROR]: (
      state: IAuthState,
      action: IActionReducer<AuthActionsType, IAuthState>,
    ) => ({
      ...state,
      ...action.payload,
      isAuthenticated: false,
      loadingAuth: false,
    }),
    [AuthActionsType.LOGOUT_GOOGLE]: (
      state: IAuthState,
      action: IActionReducer<AuthActionsType, IAuthState>,
    ) => ({
      ...state,
      ...action.payload,
      loadingAuth: true,
    }),
    [AuthActionsType.LOGOUT_GOOGLE_SUCCESS]: (
      state: IAuthState,
      action: IActionReducer<AuthActionsType, IAuthState>,
    ) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionsType.LOGOUT_GOOGLE_ERROR]: (
      state: IAuthState,
      action: IActionReducer<AuthActionsType, IAuthState>,
    ) => ({
      ...state,
      ...action.payload,
      isAuthenticated: false,
      loadingAuth: false,
    }),
  };

  return REDUCERS;
};
