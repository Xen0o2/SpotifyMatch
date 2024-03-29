import "./Login.css"

import logo from "../../assets/images/spotify_logo.png";
import config from "../../config";

export default function Login() {
	
	const login_url = `${config.URL}:${config.BACKEND_PORT}/auth/redirect`;

	return (
		<div className="login-body">
			<div className="login-container">
				<div className="login-image"></div>
				<div className="login-button-container">
					<img className="login-spotify-logo" src={logo} alt="spotify logo"/>
					<a className="login-button" href={login_url}>Log in</a>
				</div>
			</div>
		</div>
	);
};