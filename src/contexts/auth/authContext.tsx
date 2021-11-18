import {
  createContext,
  useReducer,
  Reducer,
  useEffect,
} from "react";
import { AuthReducer, initialStateAuthReducer } from "./reducer";
import { IAuthContext, IAuthState, AuthActionsType } from "./interfaces";
import { IActionReducer } from "../../types/IActionReducer";
import { useHistory } from "react-router";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContext.IProvider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      IAuthState,
      IActionReducer<AuthActionsType, IAuthState>
    >
  >(AuthReducer, initialStateAuthReducer)

  const { isAuthenticated } = state;

  const history = useHistory()

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}
