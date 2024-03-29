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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const friend_request_service_1 = require("../friend-request/friend-request.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(users, friendRequests) {
        this.users = users;
        this.friendRequests = friendRequests;
    }
    async getFriends(userId) {
        try {
            return await this.users.getFriends(userId);
        }
        catch (e) {
            throw e;
        }
    }
    async getFriendRequests(userId) {
        try {
            return await this.friendRequests.getWithUser(userId);
        }
        catch (e) {
            throw e;
        }
    }
    async findByUsername(username) {
        if (!username)
            throw new common_1.BadRequestException(`Missing argument "username" in the request's body`);
        try {
            return await this.users.findByUsername(username);
        }
        catch (e) {
            throw e;
        }
    }
    async sendFriendRequest(userId, toId) {
        try {
            return await this.friendRequests.send(userId, toId);
        }
        catch (e) {
            throw e;
        }
    }
    async acceptFriendRequest(userId, fromId) {
        try {
            return await this.friendRequests.accept(userId, fromId);
        }
        catch (e) {
            throw e;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("/:userId/friends"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)("/:userId/friends/pending"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriendRequests", null);
__decorate([
    (0, common_1.Get)("/findByUsername"),
    __param(0, (0, common_1.Query)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Post)("/:userId/sendFriendRequest/:toId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("toId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/:userId/acceptFriendRequest/:fromId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("fromId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptFriendRequest", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        friend_request_service_1.FriendRequestService])
], UserController);
//# sourceMappingURL=user.controller.js.map