import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextProps {
	token: string | null;
	setToken: ((newToken: string | null) => void) | null;
}
const AuthContext = createContext<AuthContextProps>({ token: null, setToken: null });

interface AuthProviderProps {
	children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

  const setToken = (newToken: string | null) => {
	setToken_(newToken);
	console.log("je mets", newToken);
	if (newToken)
		localStorage.setItem("token", newToken);
	else
		localStorage.removeItem("token");
	console.log(localStorage)
  };

  useEffect(() => {
    	if (token)
      		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    	else
			delete axios.defaults.headers.common["Authorization"];
	}, [token]);

	const contextValue = useMemo(() => ({
		token,
		setToken,
	}),[token]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;