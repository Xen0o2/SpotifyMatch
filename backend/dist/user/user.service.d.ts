import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(id: string, username: string, image: string): Promise<User>;
    getFriends(id: string): Promise<User[]>;
    addFriend(userId: string, toAddId: string): Promise<{
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
    findByUsername(username: string): Promise<User[]>;
}
