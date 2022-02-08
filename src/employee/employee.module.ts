import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeSchema } from './schema/employee.schema';
import { employeeChat, employeeChatSchema } from './schema/employeeChat.schema';
import { work, workSchema } from './schema/work.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: employee.name, schema: employeeSchema}]), MongooseModule.forFeature([{name: employeeChat.name, schema: employeeChatSchema}]),
      MongooseModule.forFeature([{name: work.name, schema: workSchema}])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
