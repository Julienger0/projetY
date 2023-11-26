import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(null);

  // Récupérez l'utilisateur depuis localStorage lors du chargement initial
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Écoutez les changements de l'utilisateur et mettez à jour localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ registrationData, setRegistrationData, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
