"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const friend_request_service_1 = require("./friend-request.service");
let FriendRequestModule = class FriendRequestModule {
};
exports.FriendRequestModule = FriendRequestModule;
exports.FriendRequestModule = FriendRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [prisma_service_1.PrismaService, friend_request_service_1.FriendRequestService, user_service_1.UserService],
        exports: [friend_request_service_1.FriendRequestService]
    })
], FriendRequestModule);
//# sourceMappingURL=friend-request.module.js.map