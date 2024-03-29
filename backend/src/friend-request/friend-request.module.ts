import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { FriendRequestService } from './friend-request.service';

@Module({
	imports: [PrismaModule],
	providers: [PrismaService, FriendRequestService, UserService],
	exports: [FriendRequestService]
})
export class FriendRequestModule {}
