import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-spotify';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(user: Profile): string;
}
