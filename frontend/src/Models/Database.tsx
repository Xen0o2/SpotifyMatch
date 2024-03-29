export interface User {
	id: string;
	username: string;
	image: string;
	friends: User[];
	friendRequestsSent: FriendRequest[]
	friendRequestsReceived: FriendRequest[]
}

export enum FriendRequestStatus {
	PENDING,
	ACCEPTED,
	DECLINED
}

export interface FriendRequest {
	id: string;
	from: User;
	fromId: string;
	to: User;
	toId: string;
	status: FriendRequestStatus
}