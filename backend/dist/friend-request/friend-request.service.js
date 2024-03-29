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
exports.FriendRequestService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
let FriendRequestService = class FriendRequestService {
    constructor(prisma, users) {
        this.prisma = prisma;
        this.users = users;
    }
    send(fromId, toId) {
        try {
            return this.prisma.friendRequest.create({
                data: { fromId, toId, status: "PENDING" },
                include: app_module_1.friendRequestPrismaIncludes
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de la demande d'ami de ${fromId} pour ${toId}`);
        }
    }
    async accept(accepterId, acceptedId) {
        try {
            const request = await this.prisma.friendRequest.delete({
                where: { fromId_toId: { fromId: acceptedId, toId: accepterId } },
                include: app_module_1.friendRequestPrismaIncludes
            });
            if (!request)
                throw new common_1.NotFoundException(`FriendRequest not found for ids ${accepterId} ${acceptedId}`);
            await this.users.addFriend(accepterId, acceptedId);
            return await this.users.addFriend(acceptedId, accepterId);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de l'acceptation par ${accepterId} de la demande d'ami de ${acceptedId}`);
        }
    }
    getWithUser(userId) {
        try {
            return this.prisma.friendRequest.findMany({
                where: {
                    OR: [
                        { fromId: userId },
                        { toId: userId }
                    ]
                },
                include: app_module_1.friendRequestPrismaIncludes
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Une erreur s'est produite lors de la récupération des demandes de ${userId}`);
        }
    }
};
exports.FriendRequestService = FriendRequestService;
exports.FriendRequestService = FriendRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], FriendRequestService);
//# sourceMappingURL=friend-request.service.js.map