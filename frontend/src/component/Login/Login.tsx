import { useAuth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { setToken } = useAuth();
	const navigate = useNavigate();
  
	if (!setToken) throw new Error("No setToken");

	const handleLogin = () => {
	  setToken("this is a test token");
	  navigate("/", { replace: true });
	};

	const login_url = "http://localhost:8080/auth/redirect"
  
	return (
		<a href={login_url}>login with spotify</a>
	);
};