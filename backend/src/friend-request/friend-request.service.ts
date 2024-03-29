import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { friendRequestPrismaIncludes, userPrismaIncludes } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FriendRequestService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly users: UserService
	){}

	send(fromId: string, toId: string) {
		try {
			return this.prisma.friendRequest.create({
				data: { fromId, toId, status: "PENDING" },
				include: friendRequestPrismaIncludes
			})
		} catch(e) {
			throw new InternalServerErrorException(`Une erreur s'est produite lors de la demande d'ami de ${fromId} pour ${toId}`)
		}
	}
	
	async accept(accepterId: string, acceptedId: string) {
		try {
			const request = await this.prisma.friendRequest.delete({
				where: { fromId_toId: { fromId: acceptedId, toId: accepterId } },
				include: friendRequestPrismaIncludes
			})
			if (!request)
				throw new NotFoundException(`FriendRequest not found for ids ${accepterId} ${acceptedId}`)
			await this.users.addFriend(accepterId, acceptedId);
			return await this.users.addFriend(acceptedId, accepterId);
		} catch(e) {
			throw new InternalServerErrorException(`Une erreur s'est produite lors de l'acceptation par ${accepterId} de la demande d'ami de ${acceptedId}`)
		}
	}

	getWithUser(userId: string) {
		try {
			return this.prisma.friendRequest.findMany({
				where: {
					OR: [
						{ fromId: userId },
						{ toId: userId}
					]
				},
				include: friendRequestPrismaIncludes
			})
		} catch(e) {
			throw new InternalServerErrorException(`Une erreur s'est produite lors de la récupération des demandes de ${userId}`)
		}
	}
}
