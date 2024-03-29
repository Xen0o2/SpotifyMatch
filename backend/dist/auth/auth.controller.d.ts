import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(): void;
    spotifyAuthRedirect(req: any, res: Response): Promise<Response>;
}
