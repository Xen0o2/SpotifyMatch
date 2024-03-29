import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../../Models/Database"
import { useApi } from "../../../Provider/ApiProvider";
import "./FriendElement.scss"

interface FriendElementProps {
	user: User;
	setUpdate: Dispatch<SetStateAction<boolean>>
}

export default function FriendElement({ user, setUpdate }: FriendElementProps) {

	const api = useApi();
	if (!api)
		throw new Error("Api not found")

	console.log(user)

	const sendFriendRequest = async () => {
		try {
			await api.post(`/user/${Cookies.get("id")}/sendFriendRequest/${user.id}`);
			setUpdate(old => !old);
		} catch(e) {
			console.log(e);
		}
	}

	const acceptFriendRequest = async () => {
		try {
			await api.post(`/user/${Cookies.get("id")}/acceptFriendRequest/${user.id}`)
			setUpdate(old => !old);
		} catch(e) {
			console.log(e);
		}
	}
	
	const declineFriendRequest = async () => {
		console.log("je refuse")

	}

	return (
		<div className="friend-element">
			{ user.friendRequestsReceived && user.friendRequestsSent && user.friends &&
			<>
				{	!user.friends.find(user => user.id === Cookies.get("id")) &&
					!user.friendRequestsSent.find(request => request.toId === Cookies.get("id")) &&
					!user.friendRequestsReceived.find(request => request.fromId === Cookies.get("id")) &&
					<>
						<span className="send-friend-request" onClick={sendFriendRequest}>Friend request</span>
						<img className="friend-cover pending" src={user.image} alt="" />
					</>
				}

				{ /* Si les personnes sont déjà amis, on affiche juste l'image */}
				{	user.friends.find(user => user.id === Cookies.get("id")) &&
					<img className="friend-cover" src={user.image} alt="" />
				}

				{/* Si tu as reçu une demande de cette personne */}
				{	user.friendRequestsSent.find(request => request.toId === Cookies.get("id")) &&
					<>
						<div className="pending-buttons">
							<button className="pending-button accept" onClick={acceptFriendRequest}>Accept</button>
							<button className="pending-button decline" onClick={declineFriendRequest}>Decline</button>
						</div>
						<img className="friend-cover pending" src={user.image} alt="" />
					</>
				}

				{ /* Si tu as envoyé une demande d'ami à cette personne */}
				{	user.friendRequestsReceived.find(request => request.fromId === Cookies.get("id")) &&
					<>
						<span className="pending-from-me">Pending</span>
						<img className="friend-cover pending" src={user.image} alt="" />
					</>
				}
				<p className="friend-username">{user.username}</p>
			</>}
		</div>
	)
}