import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { employeeDto } from 'src/employee/dto/employee.dto';
import { employeeChatDto } from 'src/employee/dto/employeeChat.dto';
import { employee } from 'src/employee/schema/employee.schema';
import { employeeChat } from 'src/employee/schema/employeeChat.schema';
import { userDto } from 'src/user/dto/user.dto';
import { user } from 'src/user/schema/user.schema';
import { AdminRegisterDto } from './dto/admin.dto';
import { adminChatDto } from './dto/adminChat.dto';
import { docsDto } from './dto/document.dto';
import { Admin } from './schema/admin.schema';
import { adminChat } from './schema/adminChat.schema';
import { documents } from './schema/document.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>, @InjectModel(user.name) private userModel: Model<user>,
     @InjectModel(employee.name) private employeeModel: Model<employee>, @InjectModel(documents.name) private documentsModel: Model<documents>,
     @InjectModel(adminChat.name) private adminChatModel: Model<adminChat>){ }
  async  Create(req: AdminRegisterDto){
       try{
           const registerRes = await this.adminModel.create(req)
           if(registerRes){
               return{
                   statusCode: HttpStatus.OK,
                   message: "Employee Registered Successfully",
                   data:{
                       authentication:{
                           name: registerRes.name,
                           password: registerRes.password
                       }
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

       async loginAdmin(req: AdminRegisterDto){
           try {
               const loginRes = await this.adminModel.findOne({ $or: [{Name: req.name}, { Password: req.password}]}).lean()
              if(loginRes){
               if(loginRes.password === req.password){
                   return {
                       statusCode: HttpStatus.OK,
                       message:"Login SuccessFull",
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
           } catch(error){
               return{
                   statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                   message: error.message
               }
           }
        }   
    
        async  userCreate(req: userDto){
            try{
                const registerRes = await this.userModel.create(req)
                if(registerRes){
                    return{
                        statusCode: HttpStatus.OK,
                        message: "User Registered Successfully",
                        data:{
                            authentication:{
                                name: registerRes.name,
                                password: registerRes.password
                            }
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
         
            async  createEmployee(req: employeeDto){
                try{
                    const registerRes = await this.employeeModel.create(req)
                    if(registerRes){
                        return{
                            statusCode: HttpStatus.OK,
                            message: "Employee Registered Successfully",
                            data:{
                                authentication:{
                                    name: registerRes.name,
                                    password: registerRes.password
                                }
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
            
              
            async  createDocs(req: docsDto, file){
                try{
                  
                    if (file) {
                        const reqDoc = file.map((doc, index) => {
                            let IsPrimary = false
                            if (index == 0) {
                                IsPrimary = true
                            }
                            const randomNumber = Math.floor((Math.random() * 1000000) + 1);
                            return doc.filename
                            
                        })
         
                        req.requiredDocs = reqDoc.toString()
                    }
                     
                    const docs = await this.documentsModel.create(req)
                  
                    if(docs){
                        return{
                            statusCode: HttpStatus.OK,
                            message: "Required Documents",
                           data: {
                               docsReq:docs
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

                async docsRequire() {
                    try {
                          const reqDocs = await this.documentsModel.find()
                           if (reqDocs) {
                            return {
                                StatusCode: HttpStatus.OK,
                                Message: 'List of Documents Required',
                                Data: {
                                  docsRequired: reqDocs
                                }
                            }
                        }
                        return {
                            StatusCode: HttpStatus.BAD_REQUEST,
                            Message: "InValid Request"
                        }
                
                    } catch (error) {
                        return {
                            StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                            Message: error
                
                        }
                    }
                }

     async userList(){
         try{
              const list = await this.userModel.find()
                   if(list){
                        return {
                            statusCode : HttpStatus.OK,
                            Message: 'list of users',
                            Data: {
                                listUsers: list
                            }
                        }
                    }
                        return {
                            statusCode: HttpStatus.BAD_REQUEST,
                            Message: " InValid Request"
                        }
                    }catch(error){
                        return {
                            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                            Message: error
                        }
                    }
                }
            
     async employeeList(){
                    try{
                        const list = await this.employeeModel.find()
                        if(list){
                            return {
                                statusCode : HttpStatus.OK,
                                Message: 'list of employees',
                                Data: {
                                    listUsers: list
                                }
                            }
                        }
                            return {
                                statusCode: HttpStatus.BAD_REQUEST,
                                Message: " InValid Request"
                            }
                        }catch(error){
                            return {
                                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                                Message: error
                            }
                        }
                    }
             async chatEmployee(req: adminChatDto){
                        try{
                            const registerRes = await this.adminChatModel.create(req)
                            if(registerRes){
                                return{
                                    statusCode: HttpStatus.OK,
                                    message: "Employee Registered Successfully",
                                    chatRes: registerRes
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
                
            
  

