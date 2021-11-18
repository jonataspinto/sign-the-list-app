import { useCallback, useContext } from "react";
import { getListById, getLists, updateList } from "../../../services/api";
import { IList } from "../../../types/IList";
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
  
  const assingnItem = useCallback((id: string, list: IList) => {
    dispatch({
      type: APP_ACTIONS.IS_FETCHING,
    })
    updateList(id, list);
    dispatch({
      type: APP_ACTIONS.ASSINGN_ITEM,
    })
  }, [dispatch]);

  return {
    ...state,
    fetchLists,
    loadList,
    assingnItem
  };
};
