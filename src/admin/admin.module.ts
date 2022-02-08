import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { user, userSchema } from 'src/user/schema/user.schema';
import { employee, employeeSchema } from 'src/employee/schema/employee.schema';
import { documents, documentsSchema } from './schema/document.schema';
import { adminChat, adminChatSchema } from './schema/adminChat.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema }]),
   MongooseModule.forFeature([{name: user.name, schema: userSchema}]), MongooseModule.forFeature([{name: employee.name, schema: employeeSchema}]), 
  MongooseModule.forFeature([{name: documents.name, schema: documentsSchema}]), MongooseModule.forFeature([{name: adminChat.name, schema: adminChatSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
