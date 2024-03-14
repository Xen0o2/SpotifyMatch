import { AppService } from 'src/app.service';
export declare class ProfileController {
    private readonly appService;
    constructor(appService: AppService);
    getProfile(): {
        message: string;
    };
}
