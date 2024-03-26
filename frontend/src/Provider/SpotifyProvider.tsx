import React, { createContext, useContext, useMemo } from "react";
import SpotifyWebApi from "spotify-web-api-js"

const SpotifyContext = createContext<SpotifyWebApi.SpotifyWebApiJs | null>(null);

interface SpotifyProviderProps {
	children: React.ReactNode;
}
const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
	
	const SpotifyApi = new SpotifyWebApi();
	const access_token = localStorage.getItem("access_token");

	if (access_token)
		SpotifyApi.setAccessToken(access_token);

	return (
		<SpotifyContext.Provider value={SpotifyApi}>{children}</SpotifyContext.Provider>
  	);
};

export const useSpofity = () => {
	return useContext(SpotifyContext);
};

export default SpotifyProvider;