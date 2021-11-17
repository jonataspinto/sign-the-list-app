import { IActionReducer } from "../../types/IActionReducer";
import { IList } from "../../types/IList";
import { STATUS_TYPES } from "../../types/IStatus";
import { IObjectLiteral, IObjectLiteralReducer } from "../../types/ObjectLiteral";
import { APP_ACTIONS, IAppState } from "./constants";

export const initialStateAuthReducer: IAppState = {
  lists: {} as IObjectLiteral<IList>,
  status: STATUS_TYPES.STATUS_IDLE
}

export const AppReducer = (state: IAppState , action: IActionReducer<APP_ACTIONS, IAppState>) => {
  if(!action.type){
    return state;
  }

  const REDUCERS: IObjectLiteralReducer<IAppState, IActionReducer<APP_ACTIONS, IAppState>> = {
    [APP_ACTIONS.IS_FETCHING]: (_state, _action) => ({
      ..._state,
      status: STATUS_TYPES.STATUS_LOADING
    }),
    [APP_ACTIONS.FETCH_LISTS]: (_state, _action) => ({
      ..._state,
      ..._action.payload,
      status: STATUS_TYPES.STATUS_SUCCESS
    }),
    [APP_ACTIONS.LOAD_LIST]: (_state, _action) => ({
      ..._state,
      ..._action.payload,
      status: STATUS_TYPES.STATUS_SUCCESS
    }),
    [APP_ACTIONS.ASSINGN_ITEM]: (_state, _action) => ({
      ..._state,
      ..._action.payload,
      status: STATUS_TYPES.STATUS_SUCCESS
    })
  }

  return REDUCERS[action.type](state, action);
}