import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FriendRequestService } from './friend-request/friend-request.service';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { Prisma } from '@prisma/client';

@Module({
	imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, FriendRequestModule],
	controllers: [AppController, UserController],
	providers: [AppService, UserService, FriendRequestService],
})
export class AppModule {}

export const userPrismaIncludes: Prisma.UserInclude = { 
	friends: { include: { friends: true, friendRequestsReceived: true, friendRequestsSent: true } },
	friendRequestsReceived: true,
	friendRequestsSent: true 
}

export const friendRequestPrismaIncludes: Prisma.FriendRequestInclude = {
	from: { include: userPrismaIncludes },
	to: { include: userPrismaIncludes }
}