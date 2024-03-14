import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserHomePage from "../component/HomePage/UserHomePage";
import Login from "../component/Login/Login";
import Redirect from "../component/Login/Redirect";
import Logout from "../component/Logout/Logout";
import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
	const { token } = useAuth();

	const routesForPublic = [
		{
			path: "/service",
		  	element: <div>Service Page</div>,
		},
		{
		  	path: "/about-us",
		  	element: <div>About Us</div>,
		},
	];
	
	const routesForAuthenticatedOnly = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <UserHomePage />,
				},
				{
					path: "/profile",
					element: <div>User Profile</div>,
				},
				{
					path: "/logout",
					element: <Logout />,
				},
			],
		},
	];

	const routesForNotAuthenticatedOnly = [
		{
			path: "/",
			element: <div>Home Page</div>,
		},
		{
			path: "/login",
		  	element: <Login />,
		},
		{
			path: "/redirect/:jwt",
			element: <Redirect />
		}
	];

	const router = createBrowserRouter([
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	]);

	return <RouterProvider router={router} />;  
}

export default Routes;