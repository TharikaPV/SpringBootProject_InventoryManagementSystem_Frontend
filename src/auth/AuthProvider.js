import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Corrected login method
  const login = async (username, password) => {
    // Call backend login API
    const response = await apiLogin({ username, password });

    // Extract token from response
    const tokenFromResponse = response.data?.token;
    if (!tokenFromResponse) throw new Error("Invalid login response");

    // Save token in state and localStorage
    setToken(tokenFromResponse);

    return tokenFromResponse;
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

