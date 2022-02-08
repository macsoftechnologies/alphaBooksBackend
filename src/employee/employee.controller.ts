import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { employeeDto } from './dto/employee.dto';
import { employeeChatDto } from './dto/employeeChat.dto';
import { workDto } from './dto/work.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post('/register')
  async create(@Body() req: employeeDto){
    try{
     const result = await this.employeeService.register(req)
     return result
     }catch(error)
     {
      return{
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message : error.message 
    }
  }
}

@Post('/login')
 async login(@Body() req: employeeDto){
   try{
     const result = await this.employeeService.loginEmployee(req)
     return result
    }
    catch(error)
    {
     return{
       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
       message: error.message
     }
   }
 }
 @Post('/employeeChat')
  async chatPost(@Body() req: employeeChatDto){
    try{
      const chat = await this.employeeService.employeeChat(req)
      return chat
      }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      }
    }
    
  }
  @Post('/toDo')
  async toDo(@Body() req:workDto){
    try{
      const toDo = await this.employeeService.createToDo(req)
      return toDo
    }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      }
    }
  }
}
