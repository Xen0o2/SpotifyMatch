import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { FriendRequest, User } from '@prisma/client';
import { Request } from 'express';
import { FriendRequestService } from 'src/friend-request/friend-request.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(
		private readonly users: UserService,
		private readonly friendRequests: FriendRequestService
	) {}

	@Get("/:userId/friends")
	async getFriends(@Param("userId") userId: string): Promise<User[]> {
		try {
			return await this.users.getFriends(userId);
		} catch(e) {
			throw e;
		}
	}
	
	@Get("/:userId/friends/pending")
	async getFriendRequests(@Param("userId") userId: string): Promise<FriendRequest[]> {
		try {
			return await this.friendRequests.getWithUser(userId);
		} catch(e) {
			throw e;
		}
	}

	@Get("/findByUsername")
	async findByUsername(@Query("username") username: string) {
		if (!username)
			throw new BadRequestException(`Missing argument "username" in the request's body`)
		try {
			return await this.users.findByUsername(username);
		} catch(e) {
			throw e;
		}
	}

	@Post("/:userId/sendFriendRequest/:toId")
	async sendFriendRequest(@Param("userId") userId: string, @Param("toId") toId: string) {
		try {
			return await this.friendRequests.send(userId, toId);
		} catch(e) {
			throw e;
		}
	}
	
	@Post("/:userId/acceptFriendRequest/:fromId")
	async acceptFriendRequest(@Param("userId") userId: string, @Param("fromId") fromId: string) {
		try {
			return await this.friendRequests.accept(userId, fromId);
		} catch(e) {
			throw e;
		}
	}
}
