import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';

@Injectable()
export class UserService {
	users: Profile[];

	findById(id: string) {
		return this.users.find(user => user.id == id);
	}
}
