"use client";
import React from "react";
const context = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  
  const login = (person) => {
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
  };

  const logout = () => {
    localStorage.setItem('user', JSON.stringify(null));
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <context.Provider value={value}>
      {/* <h1 className='form-tag'>Context Hook Used</h1> */}
      {children}
    </context.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(context);
};
