import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from './schema/user.schema';
import { userChat, userChatSchema } from './schema/userChat.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: user.name, schema: userSchema}]), 
  MongooseModule.forFeature([{name: userChat.name, schema: userChatSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
