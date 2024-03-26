import "./Login.css"

import logo from "../../assets/images/spotify_logo.png";
import image from "../../assets/images/login_image.png";

export default function Login() {
	
	const login_url = "http://localhost:8080/auth/redirect";

	return (
		<div className="login-body">
			<div className="login-container">
				<div className="login-image"></div>
				<div className="login-button-container">
					<img className="login-spotify-logo" src={logo} />
					<a className="login-button" href={login_url}>Se Connecter</a>
				</div>
			</div>
		</div>
	);
};