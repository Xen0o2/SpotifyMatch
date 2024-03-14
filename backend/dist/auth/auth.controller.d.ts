import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(): void;
    spotifyAuthRedirect(req: any, res: Response): Promise<Response>;
}
