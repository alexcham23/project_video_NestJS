import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  //configurando la documentacion de la API con Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentacion API NestJS Curso')
    .setDescription('Documentacion de la API del curso de NestJS')
    .addTag('courses')
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe()); //TODO ValidationPipe
  app.use(json({ limit: '60mb' }));

  await app.listen(3000);
}

bootstrap();
