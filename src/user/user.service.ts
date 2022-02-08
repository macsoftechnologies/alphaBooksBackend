import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { userChatDto } from './dto/userChat.dto';
import { user } from './schema/user.schema';
import { userChat } from './schema/userChat.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel: Model<user>, @InjectModel(userChat.name) private userChatModel: Model<userChat>){}
    async Create(req: userDto){
        try{
            const registerRes = await this.userModel.create(req);
           if(registerRes)
            return {
                statusCode: HttpStatus.OK,
                message: "registered Successfully",
                Data: {
                    res: registerRes
                }
          }
          return{
              statusCode: HttpStatus.BAD_REQUEST,
              message:"Invalid Request"
          }

    }catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
    }
}
 async login(req: userDto){
     try {
         const loginRes = await this.userModel.findOne({ $or: [{Name: req.name}, {Password: req.password}] }).lean()
         if(loginRes)
         return {
             statusCode: HttpStatus.OK,
             message: "registered Successfully",
             Data: {
                 res: loginRes
             }
       }
       return{
           statusCode: HttpStatus.BAD_REQUEST,
           message:"Invalid Request"
       }

 }catch(error){
     return{
         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
         message: error.message
     };
 }
}
 
async userChat(req: userChatDto){
    try{
        const registerRes = await this.userChatModel.create(req);
       if(registerRes)
        return {
            statusCode: HttpStatus.OK,
            message: "registered Successfully",
            Data: {
                res: registerRes
            }
      }
      return{
          statusCode: HttpStatus.BAD_REQUEST,
          message:"Invalid Request"
      }

}catch(error){
    return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
    };
}
}
}
