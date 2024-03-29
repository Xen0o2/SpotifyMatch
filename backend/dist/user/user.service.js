"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(id, username, image) {
        try {
            return await this.prisma.user.upsert({
                where: { id },
                create: { id, username, image },
                update: {}
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de la création d'utilisateur ${id} - ${name}`);
        }
    }
    async getFriends(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                include: app_module_1.userPrismaIncludes
            });
            if (!user)
                throw new common_1.NotFoundException(`Utilisateur ${id} introuvable`);
            return user.friends;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de la récupération de la liste d'amis de ${id}`);
        }
    }
    async addFriend(userId, toAddId) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { friends: { connect: { id: toAddId } } },
                include: app_module_1.userPrismaIncludes
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de l'ajout de ${toAddId} dans les amis de ${userId}`);
        }
    }
    async findByUsername(username) {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    username: {
                        contains: username,
                        mode: "insensitive"
                    }
                },
                include: app_module_1.userPrismaIncludes
            });
            return users;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de la recherche pas nom d'utilisateur`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map