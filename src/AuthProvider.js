import React, { useEffect, useState } from "react";
import { auth } from "./db/firebase";
import instagram from "./icons/instagram.svg";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setloading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container-fluid p-0 ">
        <div className="row mx-0 min-vh-100">
          <div className="col align-self-center text-center">
            <img
              className="filter-loading"
              style={{ height: "80px", width: "80px" }}
              src={instagram}
              alt="React Logo"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
