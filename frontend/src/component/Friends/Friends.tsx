import "./Friends.scss"

import image from "../../assets/images/login_image.png"
import { useEffect, useState } from "react"
import FriendElement from "./FriendElement/FriendElement"
import { FriendRequest, User } from "../../Models/Database"
import { useApi } from "../../Provider/ApiProvider"
import Cookies from "js-cookie"
import TemplateBigTracklist from "../Tracklist/BigTracklist/TemplateBigTracklist"


export default function Friends() {

	const api = useApi();
	if (!api)
		throw new Error("Api not found")

	const [update, setUpdate] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [loaded, setLoaded] = useState(0);

	const getFriends = async () => {
		try {
			const response = await api.get(`/user/${Cookies.get("id")}/friends`);
			console.log(response)
			if (response)
				setFriends(response.data)
			else throw new Error("Request failed")
			setLoaded(old => old + 1);
		} catch(e) {
			setLoaded(old => old + 1);
			console.log(e)
		}
	}

	const getFriendRequests = async () => {
		try {
			const response = await api.get(`/user/${Cookies.get("id")}/friends/pending`);
			if (response)
				setFriendRequests(response.data);
			else throw new Error("Request failed");
			setLoaded(old => old + 1);
		} catch(e) {
			setLoaded(old => old + 1);
			console.log(e);
		}
	}

	useEffect(() => {
		getFriends();
		getFriendRequests();
	}, [update])

	return (
		<>
		{update}
		<div className="home-body-content">
			<div className="friend-content">
				<div className="friend-header">
					<h1>Your friends</h1>
				</div>
				<div className="friend-list recent">
					{ loaded !== 2 && <TemplateBigTracklist />}
					{ loaded === 2 && friends.length === 0 && <span className="no-result">No friend yet</span>}
					{ loaded === 2 && friends.map((friend, index) => (
						<FriendElement user={friend} key={index} setUpdate={setUpdate} />
					))}
				</div>
				<div className="friend-header">
					<h1>Friend requests</h1>
				</div>
				<div className="friend-list pending">
					{ loaded !== 2 && <TemplateBigTracklist />}
					{ loaded === 2 && friendRequests.length === 0 && <span className="no-result">No friend request</span>}
					{ loaded === 2 && friendRequests.map((request, index) => (
						<FriendElement user={request.fromId === Cookies.get("id") ? request.to : request.from} key={index} setUpdate={setUpdate} />
					))}
				</div>
			</div>
		</div>
		</>
	)
}