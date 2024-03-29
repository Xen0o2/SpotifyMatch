import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { userPrismaIncludes } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(id: string, username: string, image: string): Promise<User> {
		try {
			return await this.prisma.user.upsert({ 
				where: { id },
				create: { id, username, image },
				update: {}
			});
		} catch(e) {
			throw new InternalServerErrorException(`Une erreur s'est produite lors de la création d'utilisateur ${id} - ${name}`)
		}
	}

	async getFriends(id: string): Promise<User[]> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id },
				include: userPrismaIncludes
			})
			if (!user)
				throw new NotFoundException(`Utilisateur ${id} introuvable`)
			return user.friends;
		} catch(e) {
			console.log(e);
			throw new InternalServerErrorException(`Une erreur s'est produite lors de la récupération de la liste d'amis de ${id}`)
		}
	}

	async addFriend(userId: string, toAddId: string) {
		try {
			return await this.prisma.user.update({
				where: { id: userId },
				data: { friends: { connect: { id: toAddId } } },
				include: userPrismaIncludes
			})
		} catch(e) {
			throw new InternalServerErrorException(`Une erreur s'est produite lors de l'ajout de ${toAddId} dans les amis de ${userId}`)
		}
	}
	
	async findByUsername(username: string): Promise<User[]> {
		try {
			const users = await this.prisma.user.findMany({
				where: {
					username: {
						contains: username,
						mode: "insensitive"
					}
				},
				include: userPrismaIncludes
			})
			return users;
		} catch(e) {
			console.log(e);
			throw new InternalServerErrorException(`Une erreur s'est produite lors de la recherche pas nom d'utilisateur`)
		}
	}
}
