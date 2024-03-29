import { redirect } from "react-router-dom";

export default function Logout() {

	localStorage.clear();
	redirect("/");

  	return (
		<></>
	)
};