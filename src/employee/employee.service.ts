import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { employeeDto } from './dto/employee.dto';
import { employeeChatDto } from './dto/employeeChat.dto';
import { workDto } from './dto/work.dto';
import { employee } from './schema/employee.schema';
import { employeeChat } from './schema/employeeChat.schema';
import { work } from './schema/work.schema';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(employee.name) private employeeModel: Model<employee>, @InjectModel(employeeChat.name) private employeeChatModel: Model<employeeChat>,
     @InjectModel(work.name) private workModel: Model<work>){}
    async register(req: employeeDto){
        try{
            const registerRes = await this.employeeModel.create(req)
            if(registerRes){
              return{
                  statusCode: HttpStatus.OK,
                  message: "Registered Successfully",
                  data:{
                      name: registerRes.name,
                      password: registerRes.password
                  }
              }  
            }
        
        return{
           statusCode: HttpStatus.BAD_REQUEST,
           message: "Invalid Request"
        }
    }catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
    }
    }

    async loginEmployee(req: employeeDto){
        try{
            const loginRes = await this.employeeModel.findOne({ $or: [{Name: req.name}, {Password: req.password}] }).lean()
            if(loginRes){
                if(loginRes.password === req.password){
                    return{
                        status: HttpStatus.OK,
                        message: "Login SuccessFull"
                    }
                }
                return{
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: "Invalid Password"
                }
            }
             return{
                 statusCode: HttpStatus.UNAUTHORIZED,
                 message: "User not found"
             }
        }catch(error){
            return{
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }
    async employeeChat(req: employeeChatDto){
        try{
            const registerRes = await this.employeeModel.create(req)
            if(registerRes){
              return{
                  statusCode: HttpStatus.OK,
                  message: "Registered Successfully",
                  data:{
                      name: registerRes.name,
                      password: registerRes.password
                  }
              }  
            }
        
        return{
           statusCode: HttpStatus.BAD_REQUEST,
           message: "Invalid Request"
        }
    }catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
    }
    }
    async createToDo(req: workDto){
        try{
            const registerRes = await this.workModel.create(req)
            if(registerRes){
              return{
                  statusCode: HttpStatus.OK,
                  message: "Registered Successfully",
                  workResp: registerRes
              }  
            }
        
        return{
           statusCode: HttpStatus.BAD_REQUEST,
           message: "Invalid Request"
        }
        }catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
    }
    }

}
