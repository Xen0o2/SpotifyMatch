
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.guard';
import { Profile } from 'passport-spotify';

interface refreshTokens {
	jwt_token: string;
	access_token: string;
	refresh_token: string;
}

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

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
		res.redirect(`http://localhost:3000/redirect?jwt=${jwt}&access_token=${authInfo.accessToken}&refresh_token=${authInfo.refreshToken}`);
	}

	// @Get("refresh/:jwt_token/:refresh_token")
	// async refreshToken(): Promise<refreshTokens> {
	// 	return { jwt_token: "", access_token: "", refresh_token: "" };
	// }
}