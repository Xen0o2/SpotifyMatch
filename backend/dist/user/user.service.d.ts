import { Profile } from 'passport';
export declare class UserService {
    users: Profile[];
    findById(id: string): Profile;
}
