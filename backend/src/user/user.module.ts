import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FriendRequestService } from 'src/friend-request/friend-request.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, UserService, FriendRequestService],
  exports: [UserService]
})
export class UserModule {}