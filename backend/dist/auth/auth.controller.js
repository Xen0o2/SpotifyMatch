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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const spotify_oauth_guard_1 = require("./guards/spotify-oauth.guard");
const user_service_1 = require("../user/user.service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login() {
        return;
    }
    async spotifyAuthRedirect(req, res) {
        const { user, authInfo } = req;
        if (!user) {
            res.redirect('/');
            return;
        }
        req.user = undefined;
        const jwt = this.authService.login(user);
        this.userService.create(user.id, user.displayName, user.photos[user.photos.length - 1]?.value || "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8463bcdace67f79859e30a17fa");
        res.redirect(`${process.env.URL}:${process.env.FRONTEND_PORT}/redirect?jwt=${jwt}&access_token=${authInfo.accessToken}&refresh_token=${authInfo.refreshToken}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(spotify_oauth_guard_1.SpotifyOauthGuard),
    (0, common_1.Get)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(spotify_oauth_guard_1.SpotifyOauthGuard),
    (0, common_1.Get)('redirect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "spotifyAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map