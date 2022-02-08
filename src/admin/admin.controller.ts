import { Body, Controller, Get, HttpStatus, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { employeeDto } from 'src/employee/dto/employee.dto';
import { userDto } from 'src/user/dto/user.dto';
import { AdminService } from './admin.service';
import { AdminRegisterDto } from './dto/admin.dto';
import { adminChatDto } from './dto/adminChat.dto';
import { docsDto } from './dto/document.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('/register')
  async create(@Body() req: AdminRegisterDto){
    try{
      const result = await this.adminService.Create(req)
      return result
    } catch(error){
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }

@Post('/login')
async login(@Body() req: AdminRegisterDto){
    try{
      const result = await this.adminService.loginAdmin(req)
      return result
    } catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
  @Post('/user')
  async userCreate(@Body() req:userDto){
    try{
      const result = await this.adminService.userCreate(req)
      return result
    }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
    @Post('/adminChat')
    async adminChat(@Body() req:adminChatDto){
      try{
        const result = await this.adminService.chatEmployee(req)
        return result
      }catch(error){
        return{
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        };
      }
    }


  

  @Post('/employee')
  async employeeCreate(@Body() req:employeeDto){
    try{
      const result = await this.adminService.createEmployee(req)
      return result
    }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }

  @Post('/docs')
  @UseInterceptors(
    AnyFilesInterceptor({
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        }),
    }),
)
  async docsCreate(@Body() req:docsDto, @UploadedFiles() file){
    try{
      const result = await this.adminService.createDocs(req, file)
      return result
    }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
  @Get('/reqDocuments')
      async reqDocs() {
          console.log()
          try {
              const response = await this.adminService.docsRequire()
              return response
          } catch (error) {
              return {
                  StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                  Message : error
              }
          }
      }
 
      @Get("/listUsers")
      async listUsers(){
        try{
          const usersList = await this.adminService.userList()
          return usersList
        } catch(error){
           return {
             StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             Message: error
           }
        }
      }

      @Get("/listEmployees")
      async listEmployees(){
        try{
          const usersList = await this.adminService.employeeList()
          return usersList
        } catch(error){
           return {
             StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             Message: error
           }
        }
      }
}
