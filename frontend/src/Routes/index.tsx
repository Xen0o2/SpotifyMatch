import { RouterProvider, createBrowserRouter } from "react-router-dom";

import NotFound from "../component/404/NotFound";
import Friends from "../component/Friends/Friends";
import Homepage from "../component/HomePage/Homepage";
import Login from "../component/Login/Login";
import Redirect from "../component/Login/Redirect";
import Logout from "../component/Logout/Logout";
import MyTop from "../component/MyTop/MyTop";
import Statistics from "../component/Statistics/Statistics";

import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import AlbumDetails from "../component/Album/AlbumDetails";
import ArtistDetails from "../component/Artist/ArtistDetails";

const Routes = () => {
	const { token } = useAuth();

	const routesForPublic = [
		{
			path: "/login",
		  	element: <Login />,
		}
	];
	
	const routesForAuthenticatedOnly = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <Homepage children={<MyTop />}/>,
				},
				{
					path: "/login",
					element: <Homepage children={<MyTop />}/>,
				},
				{
					path: "/redirect",
					element: <Homepage children={<MyTop />}/>,
				},
				{
					path: "/top",
					element: <Homepage children={<MyTop />}/>,
				},
				{
					path: "/friends",
					element: <Homepage children={<Friends />} />,
				},
				{
					path: "/statistics",
					element: <Homepage children={<Statistics />} />,
				},
				{
					path: "/logout",
					element: <Logout />,
				},
				{
					path: "/track/:trackId",
					element: <Homepage children={<AlbumDetails />} />,
				},
				{
					path: "/artist/:artistId",
					element: <Homepage children={ <ArtistDetails />} />,
				},
				{
					path: "/album/:albumId",
					element: <Homepage children={<AlbumDetails />} />,
				},
				{
					path: "*",
					element: <NotFound />,
				},
			],
		},
	];

	const routesForNotAuthenticatedOnly = [
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/login",
		  	element: <Login />,
		},
		{
			path: "/redirect",
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