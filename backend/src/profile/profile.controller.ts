import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SpotifyOauthGuard } from 'src/auth/guards/spotify-oauth.guard';

@Controller('profile')
export class ProfileController {
	constructor(private readonly appService: AppService) {}

	@UseGuards(JwtAuthGuard)
	@Get("/test")
	getProfile() {
		console.log("ok");
		return { message: "ok" };
	}
}
