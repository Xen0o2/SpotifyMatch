
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.guard';
import { Profile } from 'passport-spotify';
import { UserService } from 'src/user/user.service';

interface refreshTokens {
	jwt_token: string;
	access_token: string;
	refresh_token: string;
}

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@UseGuards(SpotifyOauthGuard)
	@Get('login')
	login(): void {
		return;
	}

	@UseGuards(SpotifyOauthGuard)
	@Get('redirect')
	async spotifyAuthRedirect(@Req() req: any, @Res() res: Response): Promise<Response> {
		const { user, authInfo }: {
			user: Profile;
			authInfo: {
				accessToken: string;
				refreshToken: string;
				expires_in: number;
			};
		} = req;

		if (!user) {
			res.redirect('/');
			return;
		}
		req.user = undefined;
		const jwt = this.authService.login(user);
		this.userService.create(user.id, user.displayName, (user.photos[user.photos.length - 1] as any)?.value || "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8463bcdace67f79859e30a17fa")
		res.redirect(`${process.env.URL}:${process.env.FRONTEND_PORT}/redirect?jwt=${jwt}&access_token=${authInfo.accessToken}&refresh_token=${authInfo.refreshToken}`);
	}

	// @Get("refresh/:jwt_token/:refresh_token")
	// async refreshToken(): Promise<refreshTokens> {
	// 	return { jwt_token: "", access_token: "", refresh_token: "" };
	// }
}