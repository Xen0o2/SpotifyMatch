import { FriendRequest, User } from '@prisma/client';
import { FriendRequestService } from 'src/friend-request/friend-request.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly users;
    private readonly friendRequests;
    constructor(users: UserService, friendRequests: FriendRequestService);
    getFriends(userId: string): Promise<User[]>;
    getFriendRequests(userId: string): Promise<FriendRequest[]>;
    findByUsername(username: string): Promise<{
        id: string;
        username: string;
        image: string;
    }[]>;
    sendFriendRequest(userId: string, toId: string): Promise<{
        from: {
            id: string;
            username: string;
            image: string;
        };
        to: {
            id: string;
            username: string;
            image: string;
        };
    } & {
        id: string;
        fromId: string;
        toId: string;
        status: import(".prisma/client").$Enums.FriendRequestStatus;
    }>;
    acceptFriendRequest(userId: string, fromId: string): Promise<{
        friends: {
            id: string;
            username: string;
            image: string;
        }[];
        friendOf: {
            id: string;
            username: string;
            image: string;
        }[];
        friendRequestsSent: {
            id: string;
            fromId: string;
            toId: string;
            status: import(".prisma/client").$Enums.FriendRequestStatus;
        }[];
        friendRequestsReceived: {
            id: string;
            fromId: string;
            toId: string;
            status: import(".prisma/client").$Enums.FriendRequestStatus;
        }[];
        _count: {
            friends: number;
            friendOf: number;
            friendRequestsSent: number;
            friendRequestsReceived: number;
        };
    } & {
        id: string;
        username: string;
        image: string;
    }>;
}
