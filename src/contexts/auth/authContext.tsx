import {
  createContext,
  useReducer,
  Reducer,
  useEffect,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import { AuthReducer, initialStateAuthReducer } from "./reducer";
import { IAuthContext, IAuthState, AuthActionsType } from "./interfaces";
import { IActionReducer } from "../../types/IActionReducer";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContext.IProvider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      IAuthState,
      IActionReducer<AuthActionsType, IAuthState>
    >
  >(AuthReducer, initialStateAuthReducer);

  const { isAuthenticated } = state;

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  const providerValue = useMemo(() => ({
    state,
    dispatch,
  }), [state, dispatch]);

  return (
    <AuthContext.Provider value={providerValue}>
      { children }
    </AuthContext.Provider>
  );
};
