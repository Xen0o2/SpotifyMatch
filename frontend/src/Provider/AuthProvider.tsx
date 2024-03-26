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
  const [token, setToken_] = useState<string | null>(localStorage.getItem("jwt_token"));

  const setToken = (newToken: string | null) => {
	setToken_(newToken);
	if (newToken)
		localStorage.setItem("jwt_token", newToken);
	else
		localStorage.removeItem("jwt_token");
  };

	// const refreshTokens = async () => {
	// 	console.log("requête")
	// 	const response = await axios.get("http://localhost:8080/auth/refresh");
	// 	console.log(response);
  	// }

  useEffect(() => {
    	if (token) {
			try {
				const information = JSON.parse(atob(token.split(".")[1]));
				if (information.exp * 1000 <= Date.now()){
					localStorage.clear();
				}
			} catch(e) {
				console.log(e)
			}
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
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