import { useCallback, useContext } from "react";
import { getListById, getLists } from "../../../services/api";
import { AppContext } from "../appContext";
import { APP_ACTIONS } from "../constants";

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("Expected to be wrapped in a AppProvider");

  const { state, dispatch } = context;

  const fetchLists = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.IS_FETCHING,
    })

    getLists((lists) => {
      dispatch({ 
        type: APP_ACTIONS.FETCH_LISTS, 
        payload: { 
          ...lists
        } 
      });
    });
  }, [dispatch]);

  const loadList = useCallback(
    (id: string) => {
      dispatch({
        type: APP_ACTIONS.IS_FETCHING,
      })
      getListById(id, (list) =>
        dispatch({ 
          type: APP_ACTIONS.LOAD_LIST, 
          payload: { 
            list
          } 
        })
      );
    },
    [dispatch]
  );

  return {
    ...state,
    fetchLists,
    loadList,
  };
};
