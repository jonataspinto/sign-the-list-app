import { useCallback, useContext } from "react";
import { getLists } from "../../../services/api";
import { AppContext } from "../appContext";
import { APP_ACTIONS } from "../constants";

export const useApp = () => {
  const context = useContext(AppContext)

  if (!context) throw new Error('Expected to be wrapped in a AppProvider');

  const { state, dispatch } = context;

  const setLists = useCallback(({ lists }) => {
    dispatch({ type: APP_ACTIONS.LOAD_LISTS, payload: { lists } })
  }, [dispatch])

  const loadLists = useCallback(() => {
    getLists(setLists)
  }, [setLists])

  return {
    ...state,
    loadLists,
  }
}
