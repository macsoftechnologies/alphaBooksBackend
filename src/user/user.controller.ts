import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { userChatDto } from './dto/userChat.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async create(@Body() req: userDto){
    try{
  const result = await this.userService.Create(req)
  return result; 
}
 catch(error){
   return{
     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
     message: error.message
   };
 }
}

@Post('/login')
async login(@Body() req:userDto){
  try{
    const result = await this.userService.login(req)
    return result;
  }catch(error){
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    };
  }
}

@Post('/chatUser')
async chatUser(@Body() req: userChatDto){
  try{
    const result = await this.userService.userChat(req)
    return result;
  }catch(error){
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    };
  }
}  


}
