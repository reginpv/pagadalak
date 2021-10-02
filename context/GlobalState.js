// Packages
import { createContext, useReducer } from 'react'

//
import AppReducer from "./AppReducer";

const initialState = {
  user: {
    name: "",
  },
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

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        editUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
