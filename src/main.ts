import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('alpha books API')
  .setDescription('alpha books apis')
  .setVersion('1.0')
  .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
   SwaggerModule.setup('api/v1', app, doc);
   app.enableCors({ origin: '*'});
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static(join(process.cwd(), './files/')));
  app.setGlobalPrefix('/api/v1')
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '500mb', extended : true }))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
