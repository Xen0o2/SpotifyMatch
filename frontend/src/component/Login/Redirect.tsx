import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Cookies from "js-cookie"
import SpotifyWebApi from "spotify-web-api-js";

export default function Redirect() {

	const { setToken } = useAuth();
	const navigate = useNavigate();
	// const SpotifyApi = useSpofity();

	const SpotifyApi = new SpotifyWebApi();


	const searchParams = new URLSearchParams(window.location.search);
	const jwt = searchParams.get("jwt");
	const access_token = searchParams.get("access_token");
	const refresh_token = searchParams.get("refresh_token");

	if (!setToken) throw new Error("No setToken");

	const handleLogin = () => {
		setToken(jwt);
		SpotifyApi?.setAccessToken(access_token);
		if (access_token)
			localStorage.setItem("access_token", access_token);
		if (refresh_token)
			document.cookie = `refresh_token=${refresh_token};secure;HttpOnly`;
		navigate("/", { replace: true });
	}

	useEffect(() => handleLogin(), [])

	return (
		<>salut</>
	);
};