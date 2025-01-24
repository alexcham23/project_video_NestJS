import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailAppModule } from './mail-app.module';

async function bootstrap() {
  //const app = await NestFactory.create(MailAppModule);
  //await app.listen(process.env.port ?? 3000);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailAppModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
