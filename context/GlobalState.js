// Packages
import { createContext, useReducer } from 'react'

//
import AppReducer from "./AppReducer";

const initialState = {
  user: {
    name: "",
  },
  searchResults: []
}

// Gloval context
export const GlobalContext = createContext(initialState)

// Global provider
export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  function editUser(user) {
    dispatch({
      type: "EDIT_USER",
      payload: user
    })
  }

  function editSearchResults(results) {
    dispatch({
      type: "EDIT_SEARCH_RESULTS",
      payload: results
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        editUser,
        searchResults: state.searchResults,
        editSearchResults
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
