import { createContext, Reducer, useReducer } from 'react';
import { IActionReducer } from '../../types/IActionReducer';
import { initialStateAuthReducer, AppReducer} from './appReducer';
import { APP_ACTIONS, IAppContext, IAppContextProvider, IAppState } from './constants';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider = ({ children }: IAppContextProvider) => {
  const [state, dispatch] = useReducer<
    Reducer<IAppState, IActionReducer<APP_ACTIONS, IAppState>>
  >(AppReducer, initialStateAuthReducer);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
