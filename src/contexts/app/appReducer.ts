import { IActionReducer } from "../../types/IActionReducer";
import { IList } from "../../types/IList";
import { IObjectLiteral, IObjectLiteralReducer } from "../../types/ObjectLiteral";
import { APP_ACTIONS, IAppState } from "./constants";

export const initialStateAuthReducer: IAppState = {
  lists: {} as IObjectLiteral<IList>
}

export const AppReducer = (state: IAppState , action: IActionReducer<APP_ACTIONS, IAppState>) => {
  if(!action.type){
    return state;
  }

  const REDUCERS: IObjectLiteralReducer<IAppState, IAppState, IActionReducer<APP_ACTIONS, IAppState>> = {
    [APP_ACTIONS.LOAD_LISTS]: (_state, _action) => ({
      ..._state,
      ..._action.payload
    })
  }

  return REDUCERS[action.type](state, action);
}