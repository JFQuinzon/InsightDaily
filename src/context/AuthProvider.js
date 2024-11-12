import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { validate } from "../api/Auth/validate";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const checkTokenValidity = async () => {
  const token = getFromLocalStorage("accessToken");
  if (token) {
    const result = await validate(token);
    if (!result.valid) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => ({
    accessToken: getFromLocalStorage("accessToken"),
    displayName: getFromLocalStorage("displayName"),
    email: getFromLocalStorage("email"),
    id: getFromLocalStorage("id"),
    userName: getFromLocalStorage("userName"),
  }));
  const [tokenValidity, setTokenValidity] = useState(false);

  const validateToken = async () => {
    const isValid = await checkTokenValidity();
    if (!isValid) {
      saveUserData({
        accessToken: null,
        displayName: null,
        email: null,
        id: null,
        userName: null,
      });
      clearLocalStorage();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const saveUserData = (data) => {
    saveToLocalStorage("accessToken", data.accessToken);
    saveToLocalStorage("displayName", data.displayName);
    saveToLocalStorage("email", data.email);
    saveToLocalStorage("id", data.id);
    saveToLocalStorage("userName", data.userName);

    setUserData(data);
    if (data.accessToken) {
      setTokenValidity(true);
    } else {
      setTokenValidity(false);
    }
  };

  const logout = () => {
    saveUserData({
      accessToken: null,
      displayName: null,
      email: null,
      id: null,
      userName: null,
    });
    clearLocalStorage();
  };

  const fetchUserData = useCallback(() => {
    const data = {
      accessToken: getFromLocalStorage("accessToken"),
      displayName: getFromLocalStorage("displayName"),
      email: getFromLocalStorage("email"),
      id: getFromLocalStorage("id"),
      userName: getFromLocalStorage("userName"),
    };
    setUserData(data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        tokenValidity,
        userData,
        saveUserData,
        logout,
        fetchUserData,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { checkTokenValidity }; // Named export
export default AuthProvider;
