import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SpotifyService } from './spotify/spotify.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ProfileController],
  providers: [AppService, SpotifyService],
})
export class AppModule {}