import axios, { AxiosInstance } from "axios";
import React, { createContext, useContext } from "react";
import config from "../config";

const ApiContext = createContext<AxiosInstance | null>(null);

interface ApiProviderProps {
	children: React.ReactNode;
}
const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {

	const api = axios.create({
		baseURL: `${config.URL}:${config.BACKEND_PORT}/`,
		timeout: 30000
	})

	return (
		<ApiContext.Provider value={api}>{children}</ApiContext.Provider>
  	);
};

export const useApi = () => {
	return useContext(ApiContext);
};

export default ApiProvider;