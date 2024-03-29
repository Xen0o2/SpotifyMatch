import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class FriendRequestService {
    private readonly prisma;
    private readonly users;
    constructor(prisma: PrismaService, users: UserService);
    send(fromId: string, toId: string): import(".prisma/client").Prisma.Prisma__FriendRequestClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    accept(accepterId: string, acceptedId: string): Promise<{
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
    getWithUser(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
}
