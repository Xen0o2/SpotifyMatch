import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-spotify';

export class SpotifyOauthStrategy extends PassportStrategy(
  Strategy,
  'spotify',
) {
  constructor() {
    super(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: `${process.env.URL}:${process.env.BACKEND_PORT}/auth/redirect`,
        scope:
          `user-read-private
           user-read-recently-played
           user-read-email
           user-top-read
           user-read-playback-state
           playlist-modify-private
           playlist-read-collaborative
           playlist-read-private
           playlist-modify-public`,
      },
      (
        accessToken: string,
        refreshToken: string,
        expires_in: number,
        profile: Profile,
        done: VerifyCallback,
      ): void => {
        return done(null, profile, { accessToken, refreshToken, expires_in });
      },
    );
  }
}