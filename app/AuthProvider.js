'use client'
import React from 'react';

const context = React.createContext();
export default function AuthProvider({children}) {
    const [user , setUser] = React.useState(null);
    const login = (person) => setUser(person);
    const logout = ()=> setUser(null);
    const value = {
        user ,
        login ,
        logout,
    }

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )
}

export const useAuth = () => {
    return React.useContext(context);
}
