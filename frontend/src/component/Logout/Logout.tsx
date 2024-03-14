import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

export default function Logout() {
  	const { setToken } = useAuth();
  	const navigate = useNavigate();

  	if (!setToken) throw new Error("No setToken");

  	const handleLogout = () => {
    	setToken(null);
    	navigate("/", { replace: true });
  	};

  	setTimeout(() => {
    	handleLogout();
  	}, 3 * 1000);

  	return <>Logout Page</>;
};