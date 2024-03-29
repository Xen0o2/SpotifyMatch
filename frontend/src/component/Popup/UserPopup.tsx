import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import "./UserPopup.scss"

export default function UserPopup() {

	const navigate = useNavigate();
	const { setToken } = useAuth();

	const logout = () => {
		localStorage.clear();
		if (setToken)
			setToken(null);
		navigate("/login");
	}

	return (
		<>
			<span className="user-popup-element">profile</span>
			<span className="user-popup-element" onClick={logout}>logout</span>
		</>
	)
}