import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';
import { RcpCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '',
        method: RequestMethod.GET,
      },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RcpCustomExceptionFilter());

  await app.listen(envs.port);
  console.log('Health check set up');
  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
