import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './_common/mongoose.config';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRootAsync({useClass: MongooseConfigService}),
    AdminModule,
    EmployeeModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
