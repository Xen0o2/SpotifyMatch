import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

export default function Redirect() {

	const { jwt } = useParams();
	const { setToken } = useAuth();
	const navigate = useNavigate();

	if (!setToken) throw new Error("No setToken");

	const handleLogin = (token: string | null) => {
		setToken(token);
		navigate("/", { replace: true });
	}

	useEffect(() => {
		handleLogin(jwt || null);
	}, [])

	return (
		<span>{jwt}</span>
	);
};