import { IAuthState, AuthActionsType } from "../interfaces";
import { IObjectLiteralReducer } from "../../../types/ObjectLiteral";
import { IActionReducer } from "../../../types/IActionReducer";
import { AuthLoadStorageReducer } from "./authLoadStorage";
import { AuthLoginGoogleReducer } from "./authLoginGoogle";
import { AuthSetUserReducer } from "./authSetUser";
import { ISubscriber } from "../../../types/IList";

export const initialStateAuthReducer = {
  isAuthenticated: false,
  loadingAuth: false,
  user: {} as ISubscriber,
};

export const AuthReducer = (
  state: IAuthState,
  action: IActionReducer<AuthActionsType, IAuthState>,
) => {
  if (!action.type) {
    return state;
  }

  const REDUCERS: IObjectLiteralReducer<IAuthState, IActionReducer<AuthActionsType, IAuthState>> = {
    ...AuthLoadStorageReducer(),
    ...AuthLoginGoogleReducer(),
    ...AuthSetUserReducer(),
  };

  return REDUCERS[action.type](state, action);
};
