import {createContext, useContext, useEffect, useState} from "react";
import {api} from "../utils/Api";

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUsersInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}

export {AppProvider, AppContext}