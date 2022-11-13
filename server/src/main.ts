import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppConfigService } from './app.config.service.js';
import { ValidationPipe } from './common/validation.pipe.js';
import { AllExceptionsFilter } from './common/exception.filter.js';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      strictGroups: true,
      transform: true,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(appConfig.serverPort);
}
bootstrap();
