import axios from "axios";

export default function UserHomePage() {

	const testRequest = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/profile/test`);
			console.log(response);
		} catch(e) {
			console.error(e);
		}
	}

	return (
		<button onClick={testRequest}>test requête</button>
	);
}